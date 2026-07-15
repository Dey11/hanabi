import "server-only";
import { cookies } from "next/headers";

export const THEME_COOKIE = "hanabi_theme";
export type Theme = "light" | "dark";

/** Reads the portal/admin theme preference from the cookie (server-side). */
export async function getTheme(): Promise<Theme> {
  const value = (await cookies()).get(THEME_COOKIE)?.value;
  return value === "dark" ? "dark" : "light";
}
