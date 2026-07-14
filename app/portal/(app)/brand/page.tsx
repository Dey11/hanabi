import type { Metadata } from "next";
import { requireClient } from "@/lib/auth";
import { getClientPortal } from "@/lib/portal-data";
import { PageHeading } from "@/components/portal/page-heading";
import { CopyButton } from "@/components/portal/copy-button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Brand" };

export default async function BrandPage() {
  const session = await requireClient();
  const client = await getClientPortal(session.clientId);
  if (!client) return null;

  const logos = client.assets.filter((a) => a.kind === "LOGO");

  return (
    <div>
      <PageHeading
        title="Brand"
        description="Colors, type, and logo files — copy or download anything you need."
      />

      {/* Colors */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold tracking-tight">Colors</h2>
        {client.colors.length === 0 ? (
          <EmptyRow label="No colors defined yet." />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {client.colors.map((c) => (
              <CopyButton
                key={c.id}
                value={c.value}
                label={`Copy ${c.name} (${c.value})`}
                className="group hover:border-foreground/20 bg-card flex-col items-stretch overflow-hidden rounded-2xl border text-left transition-colors [&>span:last-child]:hidden"
              >
                <span
                  className="block h-20 w-full border-b"
                  style={{ background: c.value }}
                />
                <span className="flex flex-col gap-0.5 p-3">
                  <span className="flex items-center justify-between">
                    <span className="text-sm font-medium">{c.name}</span>
                  </span>
                  <span className="text-muted-foreground font-mono text-[0.72rem] lowercase">
                    {c.value}
                  </span>
                  {c.role ? (
                    <span className="text-muted-foreground/70 text-[0.68rem]">
                      {c.role}
                    </span>
                  ) : null}
                </span>
              </CopyButton>
            ))}
          </div>
        )}
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="mb-4 text-sm font-semibold tracking-tight">
          Typography
        </h2>
        {client.fonts.length === 0 ? (
          <EmptyRow label="No typefaces defined yet." />
        ) : (
          <div className="flex flex-col gap-3">
            {client.fonts.map((f) => (
              <div key={f.id} className="bg-card rounded-2xl border p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-base font-semibold">{f.name}</span>
                    {f.category ? (
                      <span className="text-muted-foreground text-[0.72rem]">
                        {f.category}
                      </span>
                    ) : null}
                  </div>
                  {f.weights ? (
                    <span className="text-muted-foreground font-mono text-[0.7rem]">
                      {f.weights}
                    </span>
                  ) : null}
                </div>
                <p className="text-foreground/90 mt-3 text-2xl tracking-tight">
                  {f.specimen ?? "The quick brown fox jumps over the lazy dog."}
                </p>
                {f.url ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground mt-3 inline-block text-[0.75rem] underline underline-offset-4"
                  >
                    Font source →
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Logos */}
      <section>
        <h2 className="mb-4 text-sm font-semibold tracking-tight">Logos</h2>
        {logos.length === 0 ? (
          <EmptyRow label="No logo files uploaded yet." />
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {logos.map((l) => (
              <a
                key={l.id}
                href={l.url}
                download
                className="group hover:border-foreground/20 bg-card flex flex-col rounded-2xl border transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <span className="grid h-24 place-items-center overflow-hidden border-b bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:16px_16px] p-4">
                  <img
                    src={l.url}
                    alt={l.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </span>
                <span className="flex items-center justify-between p-3">
                  <span className="truncate text-[0.8rem] font-medium">
                    {l.name}
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground text-[0.7rem]">
                    Download
                  </span>
                </span>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return (
    <p className="text-muted-foreground rounded-2xl border border-dashed p-6 text-center text-sm">
      {label}
    </p>
  );
}
