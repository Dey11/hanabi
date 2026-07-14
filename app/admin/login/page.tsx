import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await getAdminSession()) redirect("/admin");

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="w-full max-w-[360px]">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground text-[0.7rem] font-medium tracking-[0.18em] uppercase">
            Hanabi Studio
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Admin Console
          </h1>
        </div>

        <AdminLoginForm />

        <p className="text-muted-foreground mx-auto mt-8 max-w-[280px] text-center text-[0.72rem] leading-relaxed">
          Internal access only. Manage clients, brand systems, docs, and
          updates.
        </p>
      </div>
    </main>
  );
}
