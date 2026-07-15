import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getClientSession } from "@/lib/auth";
import { BrandLogo } from "@/components/brand-logo";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default async function PortalLoginPage() {
  if (await getClientSession()) redirect("/portal");

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 flex flex-col items-center text-center">
          <BrandLogo size={48} />
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">
            Client Portal
          </h1>
        </div>

        <LoginForm />

        <p className="text-muted-foreground mx-auto mt-8 max-w-[300px] text-center text-[0.72rem] leading-relaxed">
          Brand systems crafted by Hanabi. Access is provided per project —
          contact your studio lead for credentials.
        </p>
      </div>
    </main>
  );
}
