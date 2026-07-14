"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { createClient, type FormState } from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function NewClientDialog() {
  const [open, setOpen] = useState(false);
  const [state, action, pending] = useActionState<FormState, FormData>(
    createClient,
    {},
  );

  // createClient redirects on success, so a lingering error only shows on failure.
  useEffect(() => {
    if (state.error) setOpen(true);
  }, [state.error]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" />}>
        <Plus className="size-4" />
        New client
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>New client</DialogTitle>
            <DialogDescription>
              Create a portal. You can add brand, docs, and updates afterward.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 flex flex-col gap-4">
            <Field label="Name">
              <Input name="name" placeholder="Acme Inc." required />
            </Field>
            <Field
              label="Project handle"
              hint="Used to log in. Lowercase, no spaces."
            >
              <Input name="slug" placeholder="acme" autoCapitalize="none" />
            </Field>
            <Field label="Tagline">
              <Input name="tagline" placeholder="Short one-liner (optional)" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Portal password">
                <Input
                  name="password"
                  type="text"
                  placeholder="Set a password"
                  required
                />
              </Field>
              <Field label="Accent">
                <Input name="accentColor" placeholder="oklch(...) or #hex" />
              </Field>
            </div>
            {state.error ? (
              <p className="text-destructive text-[0.8rem]">{state.error}</p>
            ) : null}
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Create client"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-[0.8rem]">{label}</Label>
      {children}
      {hint ? (
        <p className="text-muted-foreground text-[0.7rem]">{hint}</p>
      ) : null}
    </div>
  );
}
