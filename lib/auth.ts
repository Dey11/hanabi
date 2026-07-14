/**
 * Server-side auth helpers (server components + server actions).
 * Reads/writes the session cookies and enforces access.
 */
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import {
  ADMIN_COOKIE,
  CLIENT_COOKIE,
  cookieOptions,
  signSession,
  verifySession,
  type AdminSession,
  type ClientSession,
} from "@/lib/session";

// ── Client portal ────────────────────────────────────────────

export async function getClientSession(): Promise<ClientSession | null> {
  const token = (await cookies()).get(CLIENT_COOKIE)?.value;
  const session = await verifySession(token);
  return session?.kind === "client" ? session : null;
}

export async function requireClient(): Promise<ClientSession> {
  const session = await getClientSession();
  if (!session) redirect("/portal/login");
  return session;
}

export async function setClientSession(session: Omit<ClientSession, "kind">) {
  const token = await signSession({ kind: "client", ...session });
  (await cookies()).set(CLIENT_COOKIE, token, cookieOptions);
}

export async function clearClientSession() {
  (await cookies()).delete(CLIENT_COOKIE);
}

// ── Admin ────────────────────────────────────────────────────

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  const session = await verifySession(token);
  return session?.kind === "admin" ? session : null;
}

export async function requireAdmin(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function setAdminSession() {
  const token = await signSession({ kind: "admin" });
  (await cookies()).set(ADMIN_COOKIE, token, cookieOptions);
}

export async function clearAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

// ── Password verification ────────────────────────────────────

export async function verifyPassword(
  plain: string,
  hash: string,
): Promise<boolean> {
  if (!hash) return false;
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

export async function verifyAdminPassword(plain: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  return verifyPassword(plain, hash);
}
