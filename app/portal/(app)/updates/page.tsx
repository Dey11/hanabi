import type { Metadata } from "next";
import { GitCommit } from "lucide-react";
import { requireClient } from "@/lib/auth";
import { getClientPortal } from "@/lib/portal-data";
import { PageHeading } from "@/components/portal/page-heading";
import { Markdown } from "@/components/portal/markdown";
import { formatDate, formatMonthYear } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Updates" };

export default async function UpdatesPage() {
  const session = await requireClient();
  const client = await getClientPortal(session.clientId);
  if (!client) return null;

  // group by "Month Year", preserving desc order
  const groups: { label: string; items: typeof client.updates }[] = [];
  for (const u of client.updates) {
    const label = formatMonthYear(u.date);
    const last = groups[groups.length - 1];
    if (last && last.label === label) last.items.push(u);
    else groups.push({ label, items: [u] });
  }

  return (
    <div>
      <PageHeading
        title="Updates"
        description="A running log of progress on your project."
      />

      {client.updates.length === 0 ? (
        <p className="text-muted-foreground rounded-2xl border border-dashed p-10 text-center text-sm">
          No updates yet. Progress will appear here as the project moves.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {groups.map((group) => (
            <section key={group.label}>
              <h2 className="text-muted-foreground mb-5 text-[0.7rem] font-medium tracking-[0.14em] uppercase">
                {group.label}
              </h2>
              <ol className="relative ml-1 border-l pl-6">
                {group.items.map((u) => (
                  <li key={u.id} className="relative pb-8 last:pb-0">
                    <span
                      className="ring-background absolute top-1 -left-[1.65rem] size-2.5 rounded-full ring-4"
                      style={{ background: "var(--brand)" }}
                    />
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <h3 className="text-sm font-semibold tracking-tight">
                        {u.title}
                      </h3>
                      {u.tag ? (
                        <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[0.66rem] font-medium">
                          {u.tag}
                        </span>
                      ) : null}
                      <span className="text-muted-foreground ml-auto text-[0.72rem] tabular-nums">
                        {formatDate(u.date)}
                      </span>
                    </div>

                    <div className="text-muted-foreground mt-1.5">
                      <Markdown className="text-[0.88rem] [&_p]:my-2 [&_p]:first:mt-0">
                        {u.bodyMd}
                      </Markdown>
                    </div>

                    {u.commitUrl ? (
                      <a
                        href={u.commitUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground mt-2 inline-flex items-center gap-1.5 font-mono text-[0.7rem]"
                      >
                        <GitCommit className="size-3.5" />
                        {u.commitSha ? u.commitSha.slice(0, 7) : "commit"}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
