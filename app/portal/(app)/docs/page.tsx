import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { requireClient } from "@/lib/auth";
import { getClientDocsList } from "@/lib/portal-data";
import { PageHeading } from "@/components/portal/page-heading";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Docs" };

export default async function DocsPage() {
  const session = await requireClient();
  const docs = await getClientDocsList(session.clientId);

  // group by category (nullable)
  const groups = new Map<string, typeof docs>();
  for (const doc of docs) {
    const key = doc.category ?? "Documents";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(doc);
  }

  return (
    <div>
      <PageHeading
        title="Docs"
        description="Handoff documentation — everything you need to run the project yourself."
      />

      {docs.length === 0 ? (
        <p className="text-muted-foreground rounded-2xl border border-dashed p-10 text-center text-sm">
          No documents published yet.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {[...groups.entries()].map(([category, items]) => (
            <section key={category}>
              <h2 className="mb-3">
                <span className="bg-muted text-muted-foreground inline-block rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium">
                  {category}
                </span>
              </h2>
              <div className="bg-card divide-y rounded-2xl border">
                {items.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/portal/docs/${doc.slug}`}
                    className="group hover:bg-muted/50 flex items-center justify-between gap-3 px-4 py-3.5 first:rounded-t-2xl last:rounded-b-2xl"
                  >
                    <span className="text-sm font-medium">{doc.title}</span>
                    <ArrowUpRight className="text-muted-foreground/50 group-hover:text-foreground size-4 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
