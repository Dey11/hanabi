"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  updateClientSettings,
  deleteClient,
  type FormState,
} from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, SectionCard } from "@/components/admin/field";

type Client = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  accentColor: string;
  status: "ACTIVE" | "ARCHIVED";
};

export function SettingsForm({ client }: { client: Client }) {
  const [state, action, pending] = useActionState<FormState, FormData>(
    updateClientSettings,
    {},
  );
  const [accent, setAccent] = useState(client.accentColor);

  useEffect(() => {
    if (state.ok) toast.success("Settings saved");
  }, [state]);

  return (
    <div className="flex flex-col gap-5">
      <SectionCard title="Project details">
        <form action={action} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={client.id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" defaultValue={client.name} required />
            </Field>
            <Field
              label="Project handle"
              hint="Login handle. Lowercase, no spaces."
            >
              <Input
                name="slug"
                defaultValue={client.slug}
                autoCapitalize="none"
              />
            </Field>
          </div>
          <Field label="Tagline">
            <Input name="tagline" defaultValue={client.tagline ?? ""} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Accent color"
              hint="oklch(...) or #hex — tints the portal."
            >
              <div className="flex items-center gap-2">
                <span
                  className="ring-border size-9 shrink-0 rounded-lg ring-1"
                  style={{ background: accent }}
                />
                <Input
                  name="accentColor"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                />
              </div>
            </Field>
            <Field label="Status">
              <select
                name="status"
                defaultValue={client.status}
                className="border-input h-9 rounded-lg border bg-transparent px-3 text-sm shadow-xs"
              >
                <option value="ACTIVE">Active</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </Field>
          </div>
          <Field
            label="Reset password"
            hint="Leave blank to keep the current password."
          >
            <Input
              name="password"
              type="text"
              placeholder="New portal password"
            />
          </Field>

          {state.error ? (
            <p className="text-destructive text-[0.8rem]">{state.error}</p>
          ) : null}

          <div>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </div>
        </form>
      </SectionCard>

      <SectionCard
        title="Danger zone"
        description="Permanently delete this client and all of its data."
      >
        <form
          action={deleteClient}
          onSubmit={(e) => {
            if (
              !window.confirm(
                `Delete ${client.name}? This removes their portal, assets, docs, and updates. This cannot be undone.`,
              )
            )
              e.preventDefault();
          }}
        >
          <input type="hidden" name="id" value={client.id} />
          <Button
            type="submit"
            variant="outline"
            className="text-destructive border-destructive/30 hover:bg-destructive/5"
          >
            Delete client
          </Button>
        </form>
      </SectionCard>
    </div>
  );
}
