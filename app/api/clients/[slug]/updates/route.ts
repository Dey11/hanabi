import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { db } from "@/lib/db";
import { UpdateSource } from "@/lib/generated/prisma/enums";

export const runtime = "nodejs";

/**
 * POST /api/clients/:slug/updates
 *
 * Appends a progress entry to a client's changelog. Intended for the daily
 * GitHub-commit AI monitor. Authorize with:
 *
 *   Authorization: Bearer <UPDATES_API_TOKEN>
 *
 * Body (JSON):
 *   { title, bodyMd, tag?, date?, commitSha?, commitUrl? }
 *
 * If `commitSha` is supplied and already recorded for this client, the call is
 * idempotent (returns the existing entry, HTTP 200).
 */
function authorized(req: Request): boolean {
  const expected = process.env.UPDATES_API_TOKEN;
  if (!expected) return false;
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const bodyMd = typeof body.bodyMd === "string" ? body.bodyMd : "";
  const tag =
    typeof body.tag === "string" && body.tag.trim() ? body.tag.trim() : null;
  const commitSha =
    typeof body.commitSha === "string" && body.commitSha.trim()
      ? body.commitSha.trim()
      : null;
  const commitUrl =
    typeof body.commitUrl === "string" && body.commitUrl.trim()
      ? body.commitUrl.trim()
      : null;

  if (!title) {
    return NextResponse.json(
      { error: "`title` is required." },
      { status: 400 },
    );
  }

  let date = new Date();
  if (typeof body.date === "string") {
    const parsed = new Date(body.date);
    if (!isNaN(parsed.getTime())) date = parsed;
  }

  const client = await db.client.findUnique({
    where: { slug },
    select: { id: true },
  });
  if (!client) {
    return NextResponse.json({ error: "Unknown client." }, { status: 404 });
  }

  // Idempotency by commit.
  if (commitSha) {
    const existing = await db.update.findFirst({
      where: { clientId: client.id, commitSha },
    });
    if (existing) {
      return NextResponse.json(
        { update: existing, deduped: true },
        { status: 200 },
      );
    }
  }

  const update = await db.update.create({
    data: {
      clientId: client.id,
      title,
      bodyMd,
      tag,
      date,
      commitSha,
      commitUrl,
      source: UpdateSource.GITHUB,
    },
  });

  return NextResponse.json({ update }, { status: 201 });
}
