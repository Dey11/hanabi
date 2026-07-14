/**
 * Edge-safe JWT session encoding/decoding (no next/headers import).
 * Safe to use in middleware and server code alike.
 */
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export const CLIENT_COOKIE = "hanabi_portal";
export const ADMIN_COOKIE = "hanabi_admin";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type ClientSession = {
  kind: "client";
  clientId: string;
  slug: string;
  name: string;
};

export type AdminSession = {
  kind: "admin";
};

export type Session = ClientSession | AdminSession;

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export async function signSession(session: Session): Promise<string> {
  return new SignJWT(session as unknown as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySession(
  token: string | undefined,
): Promise<Session | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (payload.kind === "admin") return { kind: "admin" };
    if (
      payload.kind === "client" &&
      typeof payload.clientId === "string" &&
      typeof payload.slug === "string" &&
      typeof payload.name === "string"
    ) {
      return {
        kind: "client",
        clientId: payload.clientId,
        slug: payload.slug,
        name: payload.name,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
