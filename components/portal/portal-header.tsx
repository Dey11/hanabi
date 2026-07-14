"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";

const titles: { match: (p: string) => boolean; label: string }[] = [
  { match: (p) => p === "/portal", label: "Overview" },
  { match: (p) => p.startsWith("/portal/brand"), label: "Brand" },
  { match: (p) => p.startsWith("/portal/assets"), label: "Assets" },
  { match: (p) => p.startsWith("/portal/docs"), label: "Docs" },
  { match: (p) => p.startsWith("/portal/updates"), label: "Updates" },
];

export function PortalHeader() {
  const pathname = usePathname();
  const label = titles.find((t) => t.match(pathname))?.label ?? "Portal";

  return (
    <header className="bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex h-14 items-center gap-2 border-b px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <div className="bg-border mx-1 h-4 w-px" />
      <span className="text-sm font-medium">{label}</span>
    </header>
  );
}
