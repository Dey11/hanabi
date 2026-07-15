import { NextResponse } from "next/server";
import { zip } from "fflate";
import { getClientSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { tokensToMarkdown } from "@/lib/tokens";

export const runtime = "nodejs";

/**
 * GET /api/portal/export/assets — a zip of all of the client's assets,
 * organized by kind, plus a design-tokens.md at the root.
 */
export async function GET() {
  const session = await getClientSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await db.client.findUnique({
    where: { id: session.clientId },
    select: {
      name: true,
      colors: { orderBy: { order: "asc" } },
      fonts: { orderBy: { order: "asc" } },
      assets: { orderBy: [{ kind: "asc" }, { order: "asc" }] },
    },
  });
  if (!client) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const files: Record<string, Uint8Array> = {};

  // Design tokens document.
  files["design-tokens.md"] = new TextEncoder().encode(
    tokensToMarkdown(client.name, client.colors, client.fonts),
  );

  // Fetch each asset; keep names unique within their folder.
  const used = new Set<string>();
  await Promise.all(
    client.assets.map(async (a) => {
      try {
        const res = await fetch(a.url);
        if (!res.ok) return;
        const buf = new Uint8Array(await res.arrayBuffer());
        const folder = a.kind.toLowerCase() + "s";
        const extFromUrl = a.url.split(".").pop()?.split("?")[0] ?? "";
        const base = slugify(a.name) || "asset";
        let path = `${folder}/${base}${extFromUrl ? "." + extFromUrl : ""}`;
        let n = 1;
        while (used.has(path)) {
          path = `${folder}/${base}-${n++}${extFromUrl ? "." + extFromUrl : ""}`;
        }
        used.add(path);
        files[path] = buf;
      } catch {
        /* skip unreachable asset */
      }
    }),
  );

  const archive: Uint8Array = await new Promise((resolve, reject) => {
    zip(files, { level: 6 }, (err, data) =>
      err ? reject(err) : resolve(data),
    );
  });

  const filename = `${slugify(client.name) || "brand"}-assets.zip`;
  return new NextResponse(new Uint8Array(archive), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
