import type { Metadata } from "next";
import { Download, FileIcon } from "lucide-react";
import { requireClient } from "@/lib/auth";
import { getClientPortal } from "@/lib/portal-data";
import { PageHeading } from "@/components/portal/page-heading";
import { formatBytes } from "@/lib/format";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Assets" };

const GROUPS: { kind: "ICON" | "BANNER" | "FILE"; label: string }[] = [
  { kind: "BANNER", label: "Banners" },
  { kind: "ICON", label: "Icons" },
  { kind: "FILE", label: "Files" },
];

const IMAGE_MIME = /^image\//;

export default async function AssetsPage() {
  const session = await requireClient();
  const client = await getClientPortal(session.clientId);
  if (!client) return null;

  const downloadable = client.assets.filter((a) => a.kind !== "LOGO");

  return (
    <div>
      <PageHeading
        title="Assets"
        description="Download-ready banners, icons, and files for this project."
      />

      {downloadable.length === 0 ? (
        <p className="text-muted-foreground rounded-2xl border border-dashed p-10 text-center text-sm">
          No assets uploaded yet.
        </p>
      ) : (
        <div className="flex flex-col gap-10">
          {GROUPS.map(({ kind, label }) => {
            const items = downloadable.filter((a) => a.kind === kind);
            if (items.length === 0) return null;
            return (
              <section key={kind}>
                <h2 className="mb-4 text-sm font-semibold tracking-tight">
                  {label}
                </h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {items.map((a) => {
                    const isImage = a.mime ? IMAGE_MIME.test(a.mime) : false;
                    return (
                      <a
                        key={a.id}
                        href={a.url}
                        download
                        className="group hover:border-foreground/20 bg-card flex flex-col overflow-hidden rounded-2xl border transition-colors"
                      >
                        <span className="bg-muted/40 grid aspect-[16/10] place-items-center overflow-hidden border-b">
                          {isImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.url}
                              alt={a.name}
                              className="size-full object-cover"
                            />
                          ) : (
                            <FileIcon className="text-muted-foreground size-7" />
                          )}
                        </span>
                        <span className="flex items-center justify-between gap-2 p-3">
                          <span className="min-w-0">
                            <span className="block truncate text-[0.8rem] font-medium">
                              {a.name}
                            </span>
                            {a.sizeBytes ? (
                              <span className="text-muted-foreground text-[0.68rem]">
                                {formatBytes(a.sizeBytes)}
                              </span>
                            ) : null}
                          </span>
                          <Download className="text-muted-foreground group-hover:text-foreground size-4 shrink-0 transition-colors" />
                        </span>
                      </a>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
