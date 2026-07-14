import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Field({
  label,
  hint,
  className,
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label className="text-[0.8rem]">{label}</Label>
      {children}
      {hint ? (
        <p className="text-muted-foreground text-[0.7rem]">{hint}</p>
      ) : null}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-card rounded-2xl border p-5">
      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        {description ? (
          <p className="text-muted-foreground mt-0.5 text-[0.78rem]">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
