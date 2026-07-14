"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { deleteFromR2 } from "@/lib/r2";
import { AssetKind, UpdateSource } from "@/lib/generated/prisma/enums";

export type FormState = { error?: string; ok?: boolean };

const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

function revalidateClient(id: string) {
  revalidatePath("/admin");
  revalidatePath(`/admin/clients/${id}`);
}

// ── Client ───────────────────────────────────────────────────

export async function createClient(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const name = s(fd, "name");
  const password = s(fd, "password");
  let slug = slugify(s(fd, "slug") || name);

  if (!name || !password || !slug) {
    return { error: "Name, project handle, and password are required." };
  }

  const exists = await db.client.findUnique({ where: { slug } });
  if (exists) return { error: `The handle "${slug}" is already taken.` };

  const client = await db.client.create({
    data: {
      name,
      slug,
      tagline: s(fd, "tagline") || null,
      accentColor: s(fd, "accentColor") || undefined,
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
  revalidatePath("/admin");
  redirect(`/admin/clients/${client.id}`);
}

export async function updateClientSettings(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const id = s(fd, "id");
  const name = s(fd, "name");
  const slug = slugify(s(fd, "slug"));
  const password = s(fd, "password");

  if (!id || !name || !slug) {
    return { error: "Name and project handle are required." };
  }

  const clash = await db.client.findFirst({
    where: { slug, NOT: { id } },
    select: { id: true },
  });
  if (clash) return { error: `The handle "${slug}" is already taken.` };

  await db.client.update({
    where: { id },
    data: {
      name,
      slug,
      tagline: s(fd, "tagline") || null,
      accentColor: s(fd, "accentColor") || undefined,
      status: s(fd, "status") === "ARCHIVED" ? "ARCHIVED" : "ACTIVE",
      ...(password ? { passwordHash: await bcrypt.hash(password, 12) } : {}),
    },
  });
  revalidateClient(id);
  return { ok: true };
}

export async function deleteClient(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  if (!id) return;
  const assets = await db.asset.findMany({
    where: { clientId: id },
    select: { url: true },
  });
  await db.client.delete({ where: { id } });
  await Promise.allSettled(assets.map((a) => deleteFromR2(a.url)));
  revalidatePath("/admin");
  redirect("/admin");
}

// ── Colors ───────────────────────────────────────────────────

export async function addColor(fd: FormData) {
  await requireAdmin();
  const clientId = s(fd, "clientId");
  const name = s(fd, "name");
  const value = s(fd, "value");
  if (!clientId || !name || !value) return;
  const count = await db.brandColor.count({ where: { clientId } });
  await db.brandColor.create({
    data: { clientId, name, value, role: s(fd, "role") || null, order: count },
  });
  revalidateClient(clientId);
}

export async function deleteColor(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  if (!id) return;
  await db.brandColor.delete({ where: { id } });
  revalidateClient(clientId);
}

// ── Fonts ────────────────────────────────────────────────────

export async function addFont(fd: FormData) {
  await requireAdmin();
  const clientId = s(fd, "clientId");
  const name = s(fd, "name");
  if (!clientId || !name) return;
  const count = await db.brandFont.count({ where: { clientId } });
  await db.brandFont.create({
    data: {
      clientId,
      name,
      category: s(fd, "category") || null,
      weights: s(fd, "weights") || null,
      specimen: s(fd, "specimen") || null,
      url: s(fd, "url") || null,
      order: count,
    },
  });
  revalidateClient(clientId);
}

export async function deleteFont(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  if (!id) return;
  await db.brandFont.delete({ where: { id } });
  revalidateClient(clientId);
}

// ── Assets ───────────────────────────────────────────────────

const ASSET_KINDS = new Set(Object.values(AssetKind));

/** Called after the file is uploaded to R2 (see /api/admin/upload). */
export async function addAsset(fd: FormData) {
  await requireAdmin();
  const clientId = s(fd, "clientId");
  const name = s(fd, "name");
  const url = s(fd, "url");
  const kindRaw = s(fd, "kind");
  const kind = ASSET_KINDS.has(kindRaw as AssetKind)
    ? (kindRaw as AssetKind)
    : AssetKind.FILE;
  if (!clientId || !name || !url) return;
  const count = await db.asset.count({ where: { clientId } });
  const sizeBytes = Number(s(fd, "sizeBytes")) || null;
  await db.asset.create({
    data: {
      clientId,
      name,
      url,
      kind,
      mime: s(fd, "mime") || null,
      sizeBytes,
      order: count,
    },
  });
  revalidateClient(clientId);
}

export async function deleteAsset(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  if (!id) return;
  const asset = await db.asset.findUnique({
    where: { id },
    select: { url: true },
  });
  await db.asset.delete({ where: { id } });
  if (asset) await deleteFromR2(asset.url).catch(() => {});
  revalidateClient(clientId);
}

// ── Docs ─────────────────────────────────────────────────────

export async function upsertDoc(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  const title = s(fd, "title");
  const contentMd = String(fd.get("contentMd") ?? "");
  let slug = slugify(s(fd, "slug") || title);
  if (!clientId || !title || !slug) {
    return { error: "Title and slug are required." };
  }

  const clash = await db.doc.findFirst({
    where: { clientId, slug, NOT: id ? { id } : undefined },
    select: { id: true },
  });
  if (clash) return { error: `A doc with slug "${slug}" already exists.` };

  const data = {
    title,
    slug,
    category: s(fd, "category") || null,
    contentMd,
    published: s(fd, "published") !== "false",
  };

  if (id) {
    await db.doc.update({ where: { id }, data });
  } else {
    const count = await db.doc.count({ where: { clientId } });
    await db.doc.create({ data: { ...data, clientId, order: count } });
  }
  revalidateClient(clientId);
  return { ok: true };
}

export async function deleteDoc(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  if (!id) return;
  await db.doc.delete({ where: { id } });
  revalidateClient(clientId);
}

// ── Updates ──────────────────────────────────────────────────

export async function upsertUpdate(
  _prev: FormState,
  fd: FormData,
): Promise<FormState> {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  const title = s(fd, "title");
  const bodyMd = String(fd.get("bodyMd") ?? "");
  if (!clientId || !title) return { error: "Title is required." };

  const dateRaw = s(fd, "date");
  const date = dateRaw ? new Date(dateRaw) : new Date();

  const data = {
    title,
    bodyMd,
    tag: s(fd, "tag") || null,
    date: isNaN(date.getTime()) ? new Date() : date,
  };

  if (id) {
    await db.update.update({ where: { id }, data });
  } else {
    await db.update.create({
      data: { ...data, clientId, source: UpdateSource.MANUAL },
    });
  }
  revalidateClient(clientId);
  return { ok: true };
}

export async function deleteUpdate(fd: FormData) {
  await requireAdmin();
  const id = s(fd, "id");
  const clientId = s(fd, "clientId");
  if (!id) return;
  await db.update.delete({ where: { id } });
  revalidateClient(clientId);
}
