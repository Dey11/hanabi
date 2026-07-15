import { NextResponse } from "next/server";
import { getClientSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { tokensToMarkdown } from "@/lib/tokens";

export const runtime = "nodejs";

/** GET /api/portal/export/tokens — the client's design tokens as Markdown. */
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
    },
  });
  if (!client) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const md = tokensToMarkdown(client.name, client.colors, client.fonts);
  const filename = `${slugify(client.name) || "brand"}-design-tokens.md`;

  return new NextResponse(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
