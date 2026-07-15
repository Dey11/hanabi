import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listClients } from "@/lib/admin-data";
import { NewClientDialog } from "@/components/admin/new-client-dialog";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let clients: Awaited<ReturnType<typeof listClients>> = [];
  let dbError = false;
  try {
    clients = await listClients();
  } catch {
    dbError = true;
  }

  return (
    <div>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {clients.length} {clients.length === 1 ? "client" : "clients"}
          </p>
        </div>
        <NewClientDialog />
      </div>

      {dbError ? (
        <p className="text-muted-foreground rounded-2xl border border-dashed p-10 text-center text-sm">
          Could not reach the database. Check <code>DATABASE_URL</code>.
        </p>
      ) : clients.length === 0 ? (
        <p className="text-muted-foreground rounded-2xl border border-dashed p-10 text-center text-sm">
          No clients yet. Create your first one to get started.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {clients.map((c) => (
            <Link
              key={c.id}
              href={`/admin/clients/${c.id}`}
              className="group hover:border-foreground/20 bg-card rounded-2xl border p-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="ring-border size-8 shrink-0 rounded-lg ring-1"
                    style={{ background: c.accentColor }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{c.name}</span>
                      {c.status === "ARCHIVED" ? (
                        <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[0.66rem] font-medium">
                          Archived
                        </span>
                      ) : null}
                    </div>
                    <span className="text-muted-foreground font-mono text-[0.72rem]">
                      /{c.slug}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="text-muted-foreground/40 group-hover:text-foreground size-4 transition-colors" />
              </div>

              <div className="text-muted-foreground mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.72rem]">
                <span>{c._count.colors} colors</span>
                <span>{c._count.fonts} fonts</span>
                <span>{c._count.assets} assets</span>
                <span>{c._count.docs} docs</span>
                <span>{c._count.updates} updates</span>
                <span className="ml-auto">
                  Updated {formatDate(c.updatedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
