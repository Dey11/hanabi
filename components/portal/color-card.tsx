"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { readableOn, toCmykString, toHex, toRgbString } from "@/lib/color";

type Fmt = { label: string; value: string };

/**
 * A single brand color. Shows the swatch plus every copyable format
 * (HEX / RGB / CMYK derived from the hex, or the raw value for non-hex).
 */
export function ColorCard({
  name,
  value,
  role,
}: {
  name: string;
  value: string;
  role?: string | null;
}) {
  const hex = toHex(value);
  const formats: Fmt[] = hex
    ? [
        { label: "HEX", value: hex },
        { label: "RGB", value: toRgbString(value)! },
        { label: "CMYK", value: toCmykString(value)! },
      ]
    : [{ label: "Value", value }];

  const onDark = readableOn(value) === "light";

  return (
    <div className="bg-card overflow-hidden rounded-2xl border">
      <div
        className="relative flex h-28 items-start justify-between p-3.5"
        style={{ background: value }}
      >
        <span
          className={cn(
            "text-[0.82rem] font-medium",
            onDark ? "text-white/90" : "text-black/80",
          )}
        >
          {name}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        {role ? (
          <p className="text-muted-foreground mb-1 text-[0.72rem]">{role}</p>
        ) : null}
        {formats.map((f) => (
          <CopyRow key={f.label} label={f.label} value={f.value} />
        ))}
      </div>
    </div>
  );
}

function CopyRow({ label, value }: Fmt) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1100);
    } catch {
      /* clipboard blocked */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="group hover:bg-muted flex items-center gap-2 rounded-md py-1 pr-1.5 pl-1 text-left transition-colors"
      aria-label={`Copy ${label} ${value}`}
    >
      <span className="text-muted-foreground w-9 shrink-0 text-[0.62rem] font-medium">
        {label}
      </span>
      <span className="min-w-0 flex-1 truncate font-mono text-[0.74rem]">
        {value}
      </span>
      <span className="text-muted-foreground/50 group-hover:text-foreground transition-colors">
        {copied ? (
          <Check className="size-3 text-emerald-600" />
        ) : (
          <Copy className="size-3" />
        )}
      </span>
    </button>
  );
}
