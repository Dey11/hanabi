"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  clearClientSession,
  getClientSession,
  setClientSession,
  verifyPassword,
} from "@/lib/auth";
import { slugify } from "@/lib/utils";

export type LoginState = { error?: string };

export async function loginClient(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const input = String(formData.get("slug") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!input || !password) {
    return { error: "Enter your project name and password." };
  }

  // Clients type a project name; accept the handle, a slugified name, or the
  // display name (case-insensitive).
  const slug = slugify(input);
  let client;
  try {
    client = await db.client.findFirst({
      where: {
        OR: [
          { slug: input },
          { slug },
          { name: { equals: input, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        slug: true,
        name: true,
        passwordHash: true,
        status: true,
      },
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  if (!client || client.status === "ARCHIVED") {
    return { error: "Incorrect project or password." };
  }

  const ok = await verifyPassword(password, client.passwordHash);
  if (!ok) {
    return { error: "Incorrect project or password." };
  }

  await setClientSession({
    clientId: client.id,
    slug: client.slug,
    name: client.name,
  });
  redirect("/portal");
}

export async function logoutClient() {
  await clearClientSession();
  redirect("/portal/login");
}

export type FeedbackState = { ok?: boolean; error?: string };

export async function submitFeedback(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const session = await getClientSession();
  if (!session) return { error: "Your session expired. Please sign in again." };

  const body = String(formData.get("body") ?? "").trim();
  if (!body) return { error: "Please write a little something first." };

  const author = String(formData.get("author") ?? "").trim() || session.name;
  const consent = String(formData.get("consent") ?? "") === "true";
  const ratingRaw = Number(formData.get("rating"));
  const rating =
    Number.isFinite(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5
      ? ratingRaw
      : null;

  try {
    await db.testimonial.create({
      data: { clientId: session.clientId, author, body, consent, rating },
    });
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
  return { ok: true };
}
