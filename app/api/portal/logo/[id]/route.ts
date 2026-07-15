import { NextResponse } from "next/server";
import sharp from "sharp";
import { getClientSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

const ALLOWED = new Set([128, 256, 512, 1024, 2048]);

/**
 * GET /api/portal/logo/:id?size=512
 * Rasterizes/resizes a client's logo asset to a PNG of the requested width.
 * Scoped to the logged-in client's own assets.
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getClientSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const size = Number(new URL(req.url).searchParams.get("size"));
  if (!ALLOWED.has(size)) {
    return NextResponse.json({ error: "Unsupported size." }, { status: 400 });
  }

  const asset = await db.asset.findFirst({
    where: { id, clientId: session.clientId, kind: "LOGO" },
    select: { name: true, url: true },
  });
  if (!asset) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const source = await fetch(asset.url);
  if (!source.ok) {
    return NextResponse.json({ error: "Source unavailable." }, { status: 502 });
  }
  const input = Buffer.from(await source.arrayBuffer());

  let png: Buffer;
  try {
    png = await sharp(input, { density: 384 })
      .resize({
        width: size,
        height: size,
        fit: "inside",
        withoutEnlargement: false,
      })
      .png()
      .toBuffer();
  } catch {
    return NextResponse.json(
      { error: "Could not render image." },
      { status: 500 },
    );
  }

  const filename = `${slugify(asset.name) || "logo"}-${size}.png`;
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
