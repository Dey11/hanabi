"use client";

import { useState } from "react";
import { Check, Code2, Download } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type LogoAsset = {
  id: string;
  name: string;
  url: string;
  mime: string | null;
  sizes: string | null;
  theme: "DEFAULT" | "LIGHT" | "DARK";
};

/**
 * A logo variant: preview on a theme-appropriate backdrop, copy-as-SVG (when
 * the source is an SVG), and download at each admin-configured pixel size.
 */
export function LogoCard({ logo }: { logo: LogoAsset }) {
  const [copied, setCopied] = useState(false);
  const isSvg = logo.mime === "image/svg+xml" || logo.url.endsWith(".svg");
  const sizes = (logo.sizes ?? "")
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);

  const dark = logo.theme === "DARK";

  async function copySvg() {
    try {
      const res = await fetch(logo.url);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("SVG copied to clipboard");
      setTimeout(() => setCopied(false), 1200);
    } catch {
      toast.error("Couldn't copy the SVG.");
    }
  }

  return (
    <div className="bg-card overflow-hidden rounded-2xl border">
      <div
        className={cn(
          "grid h-32 place-items-center p-6",
          dark
            ? "bg-neutral-900"
            : "bg-[repeating-conic-gradient(#00000008_0%_25%,transparent_0%_50%)] bg-[length:16px_16px]",
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo.url}
          alt={logo.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col gap-3 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[0.82rem] font-medium">
            {logo.name}
          </span>
          {logo.theme !== "DEFAULT" ? (
            <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[0.64rem] font-medium">
              {logo.theme === "DARK" ? "On dark" : "On light"}
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {isSvg ? (
            <button
              type="button"
              onClick={copySvg}
              className="text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.72rem] font-medium transition-colors"
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-600" />
              ) : (
                <Code2 className="size-3.5" />
              )}
              Copy SVG
            </button>
          ) : null}

          <a
            href={logo.url}
            download
            className="text-foreground hover:bg-muted inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.72rem] font-medium transition-colors"
          >
            <Download className="size-3.5" />
            {isSvg ? "SVG" : "Original"}
          </a>

          {sizes.map((size) => (
            <a
              key={size}
              href={`/api/portal/logo/${logo.id}?size=${size}`}
              download
              className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.72rem] font-medium transition-colors"
            >
              <Download className="size-3.5" />
              {size}px PNG
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
