"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { upsertDoc, type FormState } from "@/app/admin/clients/actions";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Field } from "@/components/admin/field";
import { Markdown } from "@/components/portal/markdown";

export type DocDraft = {
  id?: string;
  title: string;
  slug: string;
  category: string | null;
  contentMd: string;
  published: boolean;
};

export function DocFormDialog({
  clientId,
  doc,
  open,
  onOpenChange,
}: {
  clientId: string;
  doc: DocDraft | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    upsertDoc,
    {},
  );
  const [content, setContent] = useState(doc?.contentMd ?? "");
  const [published, setPublished] = useState(doc?.published ?? true);

  // Reset the editor whenever a different doc is opened.
  useEffect(() => {
    if (open) {
      setContent(doc?.contentMd ?? "");
      setPublished(doc?.published ?? true);
    }
  }, [open, doc]);

  useEffect(() => {
    if (state.ok) {
      toast.success("Document saved");
      onOpenChange(false);
    }
  }, [state, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90svh] flex-col sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {doc?.id ? "Edit document" : "New document"}
          </DialogTitle>
        </DialogHeader>

        <form action={action} className="flex min-h-0 flex-1 flex-col gap-4">
          <input type="hidden" name="clientId" value={clientId} />
          {doc?.id ? <input type="hidden" name="id" value={doc.id} /> : null}
          <input
            type="hidden"
            name="published"
            value={published ? "true" : "false"}
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Title" className="sm:col-span-2">
              <Input name="title" defaultValue={doc?.title ?? ""} required />
            </Field>
            <Field label="Slug" hint="Auto from title if blank.">
              <Input
                name="slug"
                defaultValue={doc?.slug ?? ""}
                autoCapitalize="none"
              />
            </Field>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Category" className="sm:col-span-2">
              <Input
                name="category"
                defaultValue={doc?.category ?? ""}
                placeholder="e.g. Handoff, Getting started"
              />
            </Field>
            <label className="flex items-end gap-2 pb-2 text-[0.8rem]">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="accent-foreground size-4"
              />
              Published
            </label>
          </div>

          <Tabs defaultValue="write" className="flex min-h-0 flex-1 flex-col">
            <TabsList className="w-fit">
              <TabsTrigger value="write">Write</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="write" className="min-h-0 flex-1">
              <Textarea
                name="contentMd"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# Markdown supported…"
                className="h-64 resize-none font-mono text-[0.82rem] leading-6"
              />
            </TabsContent>
            <TabsContent value="preview" className="min-h-0 flex-1">
              <div className="bg-muted/20 h-64 overflow-y-auto rounded-xl border p-4">
                {content.trim() ? (
                  <Markdown>{content}</Markdown>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    Nothing to preview.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {state.error ? (
            <p className="text-destructive text-[0.8rem]">{state.error}</p>
          ) : null}

          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Save document"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
