import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getClientForAdmin } from "@/lib/admin-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsForm } from "@/components/admin/settings-form";
import { BrandEditor } from "@/components/admin/brand-editor";
import { AssetsEditor } from "@/components/admin/assets-editor";
import { DocsEditor } from "@/components/admin/docs-editor";
import { UpdatesEditor } from "@/components/admin/updates-editor";
import { TestimonialsView } from "@/components/admin/testimonials-view";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const client = await getClientForAdmin(id);
  return { title: client?.name ?? "Client" };
}

export default async function ClientEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = await getClientForAdmin(id);
  if (!client) notFound();

  return (
    <div>
      <Link
        href="/admin"
        className="text-muted-foreground hover:text-foreground mb-5 inline-flex items-center gap-1.5 text-[0.78rem]"
      >
        <ArrowLeft className="size-3.5" />
        All clients
      </Link>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="ring-border size-9 shrink-0 rounded-lg ring-1"
            style={{ background: client.accentColor }}
          />
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              {client.name}
            </h1>
            <p className="text-muted-foreground font-mono text-[0.72rem]">
              /{client.slug}
            </p>
          </div>
        </div>
        <Link
          href="/portal/login"
          target="_blank"
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-[0.78rem]"
        >
          Portal <ExternalLink className="size-3.5" />
        </Link>
      </div>

      <Tabs defaultValue="settings">
        <TabsList className="mb-5 w-full justify-start overflow-x-auto">
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="docs">Docs</TabsTrigger>
          <TabsTrigger value="updates">Updates</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <SettingsForm
            client={{
              id: client.id,
              name: client.name,
              slug: client.slug,
              tagline: client.tagline,
              accentColor: client.accentColor,
              status: client.status,
            }}
          />
        </TabsContent>
        <TabsContent value="brand">
          <BrandEditor
            clientId={client.id}
            colors={client.colors}
            fonts={client.fonts}
          />
        </TabsContent>
        <TabsContent value="assets">
          <AssetsEditor clientId={client.id} assets={client.assets} />
        </TabsContent>
        <TabsContent value="docs">
          <DocsEditor clientId={client.id} docs={client.docs} />
        </TabsContent>
        <TabsContent value="updates">
          <UpdatesEditor
            clientId={client.id}
            updates={client.updates.map((u) => ({
              id: u.id,
              title: u.title,
              tag: u.tag,
              bodyMd: u.bodyMd,
              date: u.date.toISOString(),
              source: u.source,
            }))}
          />
        </TabsContent>
        <TabsContent value="feedback">
          <TestimonialsView
            clientId={client.id}
            testimonials={client.testimonials.map((t) => ({
              id: t.id,
              author: t.author,
              role: t.role,
              body: t.body,
              rating: t.rating,
              consent: t.consent,
              createdAt: t.createdAt.toISOString(),
            }))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
