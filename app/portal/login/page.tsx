import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getClientSession } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

async function getProjects() {
  try {
    return await db.client.findMany({
      where: { status: "ACTIVE" },
      select: { slug: true, name: true },
      orderBy: { name: "asc" },
    });
  } catch {
    return [];
  }
}

export default async function PortalLoginPage() {
  if (await getClientSession()) redirect("/portal");
  const projects = await getProjects();

  return (
    <main className="grid min-h-svh place-items-center px-6 py-16">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground text-[0.7rem] font-medium tracking-[0.18em] uppercase">
            Hanabi Studio
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Client Portal
          </h1>
        </div>

        <LoginForm projects={projects} />

        <p className="text-muted-foreground mx-auto mt-8 max-w-[300px] text-center text-[0.72rem] leading-relaxed">
          Brand systems crafted by Hanabi. Access is provided per project —
          contact your studio lead for credentials.
        </p>
      </div>
    </main>
  );
}
