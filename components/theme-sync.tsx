"use client";

import { useEffect } from "react";

/**
 * Mirrors the portal/admin theme onto <body> so that portaled overlays
 * (Select dropdowns, Dialogs, toasts) — which render outside the
 * [data-theme-root] wrapper — inherit the same dark tokens.
 *
 * Scoped by lifecycle: the class is added while a portal/admin page is
 * mounted and removed on unmount, so navigating to the marketing site
 * (which never renders this) always leaves <body> in light mode.
 */
export function ThemeSync({ theme }: { theme: "light" | "dark" }) {
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    return () => document.body.classList.remove("dark");
  }, [theme]);
  return null;
}
