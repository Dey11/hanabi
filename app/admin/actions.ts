"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/auth";

export type AdminLoginState = { error?: string };

export async function loginAdmin(
  _prev: AdminLoginState,
  formData: FormData,
): Promise<AdminLoginState> {
  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter the admin password." };

  if (!process.env.ADMIN_PASSWORD_HASH) {
    return { error: "Admin access is not configured yet." };
  }

  const ok = await verifyAdminPassword(password);
  if (!ok) return { error: "Incorrect password." };

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin/login");
}
