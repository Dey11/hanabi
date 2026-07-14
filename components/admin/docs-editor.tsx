"use client";

import { useState } from "react";
import { Pencil, Plus } from "lucide-react";
import { deleteDoc } from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/admin/field";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  DocFormDialog,
  type DocDraft,
} from "@/components/admin/doc-form-dialog";

type Doc = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  contentMd: string;
  published: boolean;
};

export function DocsEditor({
  clientId,
  docs,
}: {
  clientId: string;
  docs: Doc[];
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<DocDraft | null>(null);

  function openNew() {
    setActive(null);
    setOpen(true);
  }
  function openEdit(doc: Doc) {
    setActive(doc);
    setOpen(true);
  }

  return (
    <SectionCard
      title="Docs"
      description="Handoff documents authored in markdown. Shown under Docs in the portal."
    >
      <div className="mb-4 flex flex-col gap-2">
        {docs.length === 0 ? (
          <p className="text-muted-foreground text-sm">No documents yet.</p>
        ) : (
          docs.map((d) => (
            <div
              key={d.id}
              className="bg-background flex items-center gap-3 rounded-xl border p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  {d.title}
                  {!d.published ? (
                    <span className="text-muted-foreground bg-muted rounded-full px-1.5 py-0.5 text-[0.6rem] font-medium uppercase">
                      Draft
                    </span>
                  ) : null}
                </p>
                <p className="text-muted-foreground font-mono text-[0.72rem]">
                  {d.category ? `${d.category} · ` : ""}/{d.slug}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => openEdit(d)}
                aria-label={`Edit ${d.title}`}
              >
                <Pencil />
              </Button>
              <DeleteButton
                action={deleteDoc}
                fields={{ id: d.id, clientId }}
              />
            </div>
          ))
        )}
      </div>

      <Button variant="secondary" onClick={openNew}>
        <Plus className="size-4" /> New document
      </Button>

      <DocFormDialog
        clientId={clientId}
        doc={active}
        open={open}
        onOpenChange={setOpen}
      />
    </SectionCard>
  );
}
