"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { deleteAsset } from "@/app/admin/clients/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, SectionCard } from "@/components/admin/field";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatBytes } from "@/lib/format";

type Asset = {
  id: string;
  name: string;
  kind: "LOGO" | "ICON" | "BANNER" | "FILE";
  url: string;
  mime: string | null;
  sizeBytes: number | null;
};

const KINDS = ["LOGO", "BANNER", "ICON", "FILE"] as const;

export function AssetsEditor({
  clientId,
  assets,
}: {
  clientId: string;
  assets: Asset[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [kind, setKind] = useState<string>("LOGO");
  const [theme, setTheme] = useState<string>("DEFAULT");
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("kind", kind);
    const file = data.get("file");
    if (!(file instanceof File) || file.size === 0) {
      toast.error("Choose a file to upload.");
      return;
    }
    setUploading(true);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json.error ?? "Upload failed.");
        return;
      }
      toast.success("Asset uploaded");
      form.reset();
      router.refresh();
    } catch {
      toast.error("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <SectionCard
      title="Assets"
      description="Logos, banners, icons, and files. Logos appear under Brand; the rest under Assets."
    >
      <div className="mb-5 flex flex-col gap-2">
        {assets.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No assets uploaded yet.
          </p>
        ) : (
          assets.map((a) => (
            <div
              key={a.id}
              className="bg-background flex items-center gap-3 rounded-xl border p-2.5"
            >
              <span className="bg-muted/40 grid size-10 shrink-0 place-items-center overflow-hidden rounded-md border">
                {a.mime?.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={a.url} alt="" className="size-full object-cover" />
                ) : (
                  <span className="text-muted-foreground text-[0.6rem] font-medium uppercase">
                    {a.name.split(".").pop()?.slice(0, 4)}
                  </span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{a.name}</p>
                <p className="text-muted-foreground text-[0.72rem]">
                  {a.kind.toLowerCase()}
                  {a.sizeBytes ? ` · ${formatBytes(a.sizeBytes)}` : ""}
                </p>
              </div>
              <a
                href={a.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-foreground text-[0.72rem] underline underline-offset-2"
              >
                View
              </a>
              <DeleteButton
                action={deleteAsset}
                fields={{ id: a.id, clientId }}
              />
            </div>
          ))
        )}
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 border-t pt-4"
      >
        <input type="hidden" name="clientId" value={clientId} />
        <div className="grid gap-3 sm:grid-cols-[8rem_1fr]">
          <Field label="Type">
            <Select value={kind} onValueChange={(v) => setKind(v ?? "FILE")}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {KINDS.map((k) => (
                  <SelectItem key={k} value={k}>
                    {k.charAt(0) + k.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Display name" hint="Uses the filename if left blank.">
            <Input name="name" placeholder="e.g. Primary logo" />
          </Field>
        </div>

        {kind === "LOGO" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Background"
              hint="Which backdrop this variant is for."
            >
              <Select
                value={theme}
                onValueChange={(v) => setTheme(v ?? "DEFAULT")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEFAULT">Any</SelectItem>
                  <SelectItem value="LIGHT">On light</SelectItem>
                  <SelectItem value="DARK">On dark</SelectItem>
                </SelectContent>
              </Select>
              <input type="hidden" name="theme" value={theme} />
            </Field>
            <Field
              label="Download sizes (px)"
              hint="Comma-separated: 128, 256, 512, 1024, 2048."
            >
              <Input name="sizes" placeholder="256, 512, 1024" />
            </Field>
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <Field label="File">
            <Input
              name="file"
              type="file"
              required
              className="file:text-foreground"
            />
          </Field>
          <div className="flex items-end">
            <Button
              type="submit"
              disabled={uploading}
              className="w-full sm:w-auto"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <Upload className="size-4" /> Upload
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      <p className="text-muted-foreground mt-2 text-[0.7rem]">
        Logo PNGs are generated on download at the sizes you set. Max 25 MB.
      </p>
    </SectionCard>
  );
}
