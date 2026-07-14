"use client";

import { useState } from "react";
import { GitCommit, Pencil, Plus } from "lucide-react";
import { deleteUpdate } from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/admin/field";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  UpdateFormDialog,
  type UpdateDraft,
} from "@/components/admin/update-form-dialog";

type Update = {
  id: string;
  title: string;
  tag: string | null;
  bodyMd: string;
  date: string; // ISO
  source: "MANUAL" | "GITHUB";
};

export function UpdatesEditor({
  clientId,
  updates,
}: {
  clientId: string;
  updates: Update[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<UpdateDraft | null>(null);

  function openNew() {
    setActive(null);
    setOpen(true);
  }
  function openEdit(u: Update) {
    setActive({
      id: u.id,
      title: u.title,
      tag: u.tag,
      bodyMd: u.bodyMd,
      date: u.date.slice(0, 10),
    });
    setOpen(true);
  }

  return (
    <SectionCard
      title="Updates"
      description="Progress log for the client. GitHub entries are added automatically."
    >
      <div className="mb-4 flex flex-col gap-2">
        {updates.length === 0 ? (
          <p className="text-muted-foreground text-sm">No updates yet.</p>
        ) : (
          updates.map((u) => (
            <div
              key={u.id}
              className="bg-background flex items-center gap-3 rounded-xl border p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  {u.source === "GITHUB" ? (
                    <GitCommit className="text-muted-foreground size-3.5 shrink-0" />
                  ) : null}
                  {u.title}
                  {u.tag ? (
                    <span className="text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium">
                      {u.tag}
                    </span>
                  ) : null}
                </p>
                <p className="text-muted-foreground text-[0.72rem] tabular-nums">
                  {u.date.slice(0, 10)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => openEdit(u)}
                aria-label={`Edit ${u.title}`}
              >
                <Pencil />
              </Button>
              <DeleteButton
                action={deleteUpdate}
                fields={{ id: u.id, clientId }}
              />
            </div>
          ))
        )}
      </div>

      <Button variant="secondary" onClick={openNew}>
        <Plus className="size-4" /> New update
      </Button>

      <UpdateFormDialog
        clientId={clientId}
        update={active}
        open={open}
        onOpenChange={setOpen}
      />
    </SectionCard>
  );
}
