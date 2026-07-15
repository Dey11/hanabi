import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cn } from "@/lib/utils";
import { requireClient } from "@/lib/auth";
import { getTheme } from "@/lib/theme";
import { getClientChrome, getClientDocsList } from "@/lib/portal-data";
import { PortalSidebar } from "@/components/portal/portal-sidebar";
import { PortalHeader } from "@/components/portal/portal-header";
import { ThemeSync } from "@/components/theme-sync";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Client Portal", template: "%s · Hanabi Portal" },
  robots: { index: false, follow: false },
};

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireClient();
  const [chrome, docs] = await Promise.all([
    getClientChrome(session.clientId),
    getClientDocsList(session.clientId),
  ]);

  // Client was deleted out from under a live session.
  if (!chrome) redirect("/portal/login");

  const theme = await getTheme();

  return (
    <SidebarProvider
      data-theme-root
      className={cn(
        "bg-background text-foreground",
        theme === "dark" && "dark",
      )}
      style={
        {
          "--brand": chrome.accentColor,
        } as React.CSSProperties
      }
    >
      <PortalSidebar
        name={chrome.name}
        tagline={chrome.tagline}
        logoUrl={chrome.logoUrl}
        docs={docs}
      />
      <SidebarInset>
        <PortalHeader />
        <div className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
          {children}
        </div>
      </SidebarInset>
      <Toaster position="bottom-right" />
      <ThemeSync theme={theme} />
    </SidebarProvider>
  );
}
