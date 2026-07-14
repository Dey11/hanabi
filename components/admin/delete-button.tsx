"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Submits `action` (a server action) with the given hidden fields after a
 * native confirm. Keeps destructive actions one intentional click away.
 */
export function DeleteButton({
  action,
  fields,
  confirm: confirmText = "Delete this item? This cannot be undone.",
  label,
  size = "icon-sm",
  variant = "ghost",
}: {
  action: (fd: FormData) => void | Promise<void>;
  fields: Record<string, string>;
  confirm?: string;
  label?: string;
  size?: React.ComponentProps<typeof Button>["size"];
  variant?: React.ComponentProps<typeof Button>["variant"];
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {Object.entries(fields).map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
      <Button
        type="submit"
        variant={variant}
        size={label ? "sm" : size}
        className="text-muted-foreground hover:text-destructive"
      >
        <Trash2 />
        {label ? <span>{label}</span> : null}
      </Button>
    </form>
  );
}
