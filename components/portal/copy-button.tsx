"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Click-to-copy wrapper. Renders `children` and copies `value` to the
 * clipboard, flashing a check on success.
 */
export function CopyButton({
  value,
  children,
  className,
  label,
}: {
  value: string;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard blocked — no-op
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={label ?? `Copy ${value}`}
      className={cn(
        "group/copy relative inline-flex items-center gap-2 outline-none",
        className,
      )}
    >
      {children}
      <span className="text-muted-foreground group-hover/copy:text-foreground transition-colors">
        {copied ? (
          <Check className="size-3.5 text-emerald-600" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </span>
    </button>
  );
}
