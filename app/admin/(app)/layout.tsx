import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAdmin } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · Hanabi Admin" },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="bg-muted/30 min-h-svh">
      <header className="bg-background/90 sticky top-0 z-20 border-b backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight">Hanabi</span>
            <span className="text-muted-foreground bg-muted rounded-md px-1.5 py-0.5 text-[0.62rem] font-medium tracking-[0.12em] uppercase">
              Admin
            </span>
          </Link>
          <form action={logoutAdmin}>
            <Button variant="ghost" size="sm" type="submit">
              Sign out
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  );
}
