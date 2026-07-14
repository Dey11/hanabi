"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upsertUpdate, type FormState } from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Field } from "@/components/admin/field";

export type UpdateDraft = {
  id?: string;
  title: string;
  tag: string | null;
  bodyMd: string;
  date: string; // yyyy-mm-dd
};

export function UpdateFormDialog({
  clientId,
  update,
  open,
  onOpenChange,
}: {
  clientId: string;
  update: UpdateDraft | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    upsertUpdate,
    {},
  );
  const [body, setBody] = useState(update?.bodyMd ?? "");

  useEffect(() => {
    if (open) setBody(update?.bodyMd ?? "");
  }, [open, update]);

  useEffect(() => {
    if (state.ok) {
      toast.success("Update saved");
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{update?.id ? "Edit update" : "New update"}</DialogTitle>
        </DialogHeader>

        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="clientId" value={clientId} />
          {update?.id ? (
            <input type="hidden" name="id" value={update.id} />
          ) : null}

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Title" className="sm:col-span-2">
              <Input name="title" defaultValue={update?.title ?? ""} required />
            </Field>
            <Field label="Date">
              <Input
                name="date"
                type="date"
                defaultValue={update?.date ?? ""}
              />
            </Field>
          </div>
          <Field label="Tag" hint="e.g. Design, Build, Milestone (optional)">
            <Input name="tag" defaultValue={update?.tag ?? ""} />
          </Field>
          <Field label="Body" hint="Markdown supported.">
            <Textarea
              name="bodyMd"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What changed…"
              className="h-32 resize-none text-[0.88rem]"
            />
          </Field>

          {state.error ? (
            <p className="text-destructive text-[0.8rem]">{state.error}</p>
          ) : null}

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Save update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
