"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";

/**
 * Toggles a `dark` class on the nearest [data-theme-root] wrapper (portal or
 * admin shell) — NOT <html> — so the marketing site is never affected. The
 * initial value is set server-side from a cookie (no flash); this just flips it
 * and persists the choice for the next request.
 */
function useThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-theme-root]");
    setDark(root?.classList.contains("dark") ?? false);
  }, []);

  function toggle() {
    const root = document.querySelector<HTMLElement>("[data-theme-root]");
    if (!root) return;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    document.cookie = `hanabi_theme=${next ? "dark" : "light"}; path=/; max-age=31536000; samesite=lax`;
    setDark(next);
  }

  return { dark, toggle };
}

export function PortalThemeToggle() {
  const { dark, toggle } = useThemeToggle();
  return (
    <SidebarMenuButton
      type="button"
      onClick={toggle}
      className="text-muted-foreground hover:text-foreground"
    >
      {dark ? <Sun /> : <Moon />}
      <span>{dark ? "Light mode" : "Dark mode"}</span>
    </SidebarMenuButton>
  );
}

export function ThemeToggleButton({ className }: { className?: string }) {
  const { dark, toggle } = useThemeToggle();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("text-muted-foreground", className)}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
