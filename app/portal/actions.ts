"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import {
  clearClientSession,
  setClientSession,
  verifyPassword,
} from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginClient(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const slug = String(formData.get("slug") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!slug || !password) {
    return { error: "Select a project and enter your password." };
  }

  let client;
  try {
    client = await db.client.findUnique({
      where: { slug },
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
