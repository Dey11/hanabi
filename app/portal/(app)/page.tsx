import Link from "next/link";
import {
  ArrowUpRight,
  Activity,
  FileText,
  FolderDown,
  Palette,
} from "lucide-react";
import { requireClient } from "@/lib/auth";
import { getClientPortal } from "@/lib/portal-data";
import { Markdown } from "@/components/portal/markdown";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const session = await requireClient();
  const client = await getClientPortal(session.clientId);
  if (!client) return null;

  const cards = [
    {
      href: "/portal/brand",
      label: "Brand",
      icon: Palette,
      count: client.colors.length + client.fonts.length,
      unit: "tokens",
    },
    {
      href: "/portal/assets",
      label: "Assets",
      icon: FolderDown,
      count: client.assets.length,
      unit: "files",
    },
    {
      href: "/portal/docs",
      label: "Docs",
      icon: FileText,
      count: client.docs.length,
      unit: "documents",
    },
    {
      href: "/portal/updates",
      label: "Updates",
      icon: Activity,
      count: client.updates.length,
      unit: "entries",
    },
  ];

  const latest = client.updates.slice(0, 3);

  return (
    <div>
      <div className="mb-10">
        <p className="text-muted-foreground text-[0.7rem] font-medium tracking-[0.16em] uppercase">
          Client Portal
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {client.name}
        </h1>
        {client.tagline ? (
          <p className="text-muted-foreground mt-2 text-sm">{client.tagline}</p>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group hover:border-foreground/20 bg-card relative flex flex-col justify-between rounded-2xl border p-4 transition-colors"
          >
            <div className="flex items-center justify-between">
              <c.icon className="text-muted-foreground size-4" />
              <ArrowUpRight className="text-muted-foreground/50 group-hover:text-foreground size-4 transition-colors" />
            </div>
            <div className="mt-8">
              <p className="text-2xl font-semibold tabular-nums">{c.count}</p>
              <p className="text-muted-foreground text-[0.72rem]">
                {c.label} · {c.unit}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-tight">
            Latest updates
          </h2>
          <Link
            href="/portal/updates"
            className="text-muted-foreground hover:text-foreground text-[0.78rem]"
          >
            View all
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-muted-foreground rounded-2xl border border-dashed p-8 text-center text-sm">
            No updates yet. Progress will appear here as the project moves.
          </p>
        ) : (
          <ol className="relative border-l pl-5">
            {latest.map((u) => (
              <li key={u.id} className="relative pb-6 last:pb-0">
                <span
                  className="ring-background absolute top-1.5 -left-[1.4rem] size-2 rounded-full ring-4"
                  style={{ background: "var(--brand)" }}
                />
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-sm font-medium">{u.title}</span>
                  {u.tag ? (
                    <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[0.66rem] font-medium">
                      {u.tag}
                    </span>
                  ) : null}
                  <span className="text-muted-foreground ml-auto text-[0.72rem] tabular-nums">
                    {formatDate(u.date)}
                  </span>
                </div>
                <div className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                  <Markdown className="text-sm [&_p]:my-0">{u.bodyMd}</Markdown>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
