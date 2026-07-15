"use client";

import { Plus } from "lucide-react";
import {
  addColor,
  deleteColor,
  addFont,
  deleteFont,
} from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, SectionCard } from "@/components/admin/field";
import { DeleteButton } from "@/components/admin/delete-button";

type Color = {
  id: string;
  name: string;
  value: string;
  role: string | null;
  group: string;
};
type Font = {
  id: string;
  name: string;
  category: string | null;
  weights: string | null;
  specimen: string | null;
  bodySpecimen: string | null;
  url: string | null;
};

export function BrandEditor({
  clientId,
  colors,
  fonts,
}: {
  clientId: string;
  colors: Color[];
  fonts: Font[];
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Colors */}
      <SectionCard
        title="Colors"
        description="Click-to-copy swatches on the client's Brand page."
      >
        <div className="mb-4 flex flex-col gap-2">
          {colors.length === 0 ? (
            <p className="text-muted-foreground text-sm">No colors yet.</p>
          ) : (
            colors.map((c) => (
              <div
                key={c.id}
                className="bg-background flex items-center gap-3 rounded-xl border p-2.5"
              >
                <span
                  className="ring-border size-8 shrink-0 rounded-md ring-1"
                  style={{ background: c.value }}
                />
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-sm font-medium">
                    {c.name}
                    <span className="text-muted-foreground bg-muted rounded-full px-2 py-0.5 text-[0.62rem] font-medium">
                      {c.group}
                    </span>
                  </p>
                  <p className="text-muted-foreground font-mono text-[0.72rem]">
                    {c.value}
                    {c.role ? ` · ${c.role}` : ""}
                  </p>
                </div>
                <DeleteButton
                  action={deleteColor}
                  fields={{ id: c.id, clientId }}
                />
              </div>
            ))
          )}
        </div>

        <form action={addColor} className="grid gap-2 sm:grid-cols-2">
          <input type="hidden" name="clientId" value={clientId} />
          <Input name="name" placeholder="Name (e.g. Primary)" required />
          <Input
            name="value"
            placeholder="#hex (RGB/CMYK auto-derived)"
            required
          />
          <Input name="role" placeholder="Role (optional)" />
          <Input
            name="group"
            placeholder="Palette (e.g. Core, Accent)"
            defaultValue="Core"
          />
          <Button type="submit" variant="secondary" className="sm:col-span-2">
            <Plus className="size-4" /> Add color
          </Button>
        </form>
      </SectionCard>

      {/* Fonts */}
      <SectionCard
        title="Typography"
        description="Typefaces shown on the Brand page."
      >
        <div className="mb-4 flex flex-col gap-2">
          {fonts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No typefaces yet.</p>
          ) : (
            fonts.map((f) => (
              <div
                key={f.id}
                className="bg-background flex items-center gap-3 rounded-xl border p-2.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {f.name}
                    {f.category ? (
                      <span className="text-muted-foreground font-normal">
                        {" "}
                        · {f.category}
                      </span>
                    ) : null}
                  </p>
                  {f.weights ? (
                    <p className="text-muted-foreground font-mono text-[0.72rem]">
                      {f.weights}
                    </p>
                  ) : null}
                </div>
                <DeleteButton
                  action={deleteFont}
                  fields={{ id: f.id, clientId }}
                />
              </div>
            ))
          )}
        </div>

        <form action={addFont} className="flex flex-col gap-2">
          <input type="hidden" name="clientId" value={clientId} />
          <div className="grid gap-2 sm:grid-cols-2">
            <Field label="Name">
              <Input name="name" placeholder="Geist" required />
            </Field>
            <Field label="Category">
              <Input name="category" placeholder="Sans / Body" />
            </Field>
            <Field label="Weights">
              <Input name="weights" placeholder="400, 500, 700" />
            </Field>
            <Field label="Source URL">
              <Input name="url" placeholder="https://..." />
            </Field>
          </div>
          <Field
            label="Heading specimen"
            hint="Large sample line on the Brand page."
          >
            <Input name="specimen" placeholder="The quick brown fox…" />
          </Field>
          <Field
            label="Paragraph specimen"
            hint="Body sample shown under the heading."
          >
            <Input
              name="bodySpecimen"
              placeholder="A longer sentence in this typeface…"
            />
          </Field>
          <div>
            <Button type="submit" variant="secondary">
              <Plus className="size-4" /> Add typeface
            </Button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
