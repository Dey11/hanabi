import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { r2Configured, uploadToR2 } from "@/lib/r2";
import { slugify } from "@/lib/utils";
import { AssetKind, AssetTheme } from "@/lib/generated/prisma/enums";

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB
const KINDS = new Set(Object.values(AssetKind));
const THEMES = new Set(Object.values(AssetTheme));

/** Normalize a comma-separated px list, e.g. "256, 512x, foo, 1024" -> "256,512,1024". */
function normalizeSizes(input: string): string | null {
  const list = input
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0 && n <= 4096);
  return list.length ? Array.from(new Set(list)).join(",") : null;
}

export async function POST(req: Request) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!r2Configured()) {
    return NextResponse.json(
      { error: "R2 storage is not configured." },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const file = form.get("file");
  const clientId = String(form.get("clientId") ?? "");
  const kindRaw = String(form.get("kind") ?? "FILE");
  const kind = KINDS.has(kindRaw as AssetKind)
    ? (kindRaw as AssetKind)
    : AssetKind.FILE;
  const themeRaw = String(form.get("theme") ?? "DEFAULT");
  const theme =
    kind === AssetKind.LOGO && THEMES.has(themeRaw as AssetTheme)
      ? (themeRaw as AssetTheme)
      : AssetTheme.DEFAULT;
  const sizes =
    kind === AssetKind.LOGO
      ? normalizeSizes(String(form.get("sizes") ?? ""))
      : null;

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!clientId) {
    return NextResponse.json({ error: "Missing clientId." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File exceeds the 25 MB limit." },
      { status: 413 },
    );
  }

  const client = await db.client.findUnique({
    where: { id: clientId },
    select: { id: true },
  });
  if (!client) {
    return NextResponse.json({ error: "Unknown client." }, { status: 404 });
  }

  const dot = file.name.lastIndexOf(".");
  const ext = dot > -1 ? file.name.slice(dot + 1).toLowerCase() : "";
  const base =
    slugify(dot > -1 ? file.name.slice(0, dot) : file.name) || "file";
  const key = `clients/${clientId}/${crypto.randomUUID()}-${base}${ext ? "." + ext : ""}`;

  const bytes = Buffer.from(await file.arrayBuffer());
  const url = await uploadToR2(
    key,
    bytes,
    file.type || "application/octet-stream",
  );

  const order = await db.asset.count({ where: { clientId } });
  const asset = await db.asset.create({
    data: {
      clientId,
      name: form.get("name")?.toString().trim() || file.name,
      url,
      kind,
      mime: file.type || null,
      sizeBytes: file.size,
      theme,
      sizes,
      order,
    },
  });

  return NextResponse.json({ asset });
}
