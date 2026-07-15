import type { Metadata } from "next";
import { requireClient } from "@/lib/auth";
import { getClientPortal } from "@/lib/portal-data";
import { PageHeading } from "@/components/portal/page-heading";
import { ColorCard } from "@/components/portal/color-card";
import { LogoCard, type LogoAsset } from "@/components/portal/logo-card";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Brand" };

export default async function BrandPage() {
  const session = await requireClient();
  const client = await getClientPortal(session.clientId);
  if (!client) return null;

  const logos = client.assets.filter((a) => a.kind === "LOGO");

  // Group colors by palette, preserving first-seen order.
  const palettes: { name: string; colors: typeof client.colors }[] = [];
  for (const c of client.colors) {
    const key = c.group || "Core";
    const existing = palettes.find((p) => p.name === key);
    if (existing) existing.colors.push(c);
    else palettes.push({ name: key, colors: [c] });
  }

  return (
    <div>
      <PageHeading
        title="Brand"
        description="Colors, type, and logo files — copy or download anything you need."
      />

      {/* Colors */}
      <section className="mb-14">
        <div className="mb-4 flex items-center gap-2">
          <h2 className="text-sm font-semibold tracking-tight">Colors</h2>
        </div>
        {client.colors.length === 0 ? (
          <EmptyRow label="No colors defined yet." />
        ) : (
          <div className="flex flex-col gap-8">
            {palettes.map((p) => (
              <div key={p.name}>
                <span className="bg-muted text-muted-foreground mb-3 inline-block rounded-full px-2.5 py-0.5 text-[0.72rem] font-medium">
                  {p.name}
                </span>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {p.colors.map((c) => (
                    <ColorCard
                      key={c.id}
                      name={c.name}
                      value={c.value}
                      role={c.role}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Typography */}
      <section className="mb-14">
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

                <p className="text-foreground/90 mt-4 text-3xl font-semibold tracking-tight">
                  {f.specimen ?? "The quick brown fox jumps over the lazy dog."}
                </p>
                <p className="text-muted-foreground mt-2 max-w-prose text-[0.95rem] leading-7">
                  {f.bodySpecimen ??
                    "Whereupon a jovial quartz sphinx, vexed by the lazy dog, quickly jumped over five boxes — 1234567890."}
                </p>

                {f.url ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground mt-4 inline-block text-[0.75rem] underline underline-offset-4"
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {logos.map((l) => (
              <LogoCard key={l.id} logo={l as LogoAsset} />
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
