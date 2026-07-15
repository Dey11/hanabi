import { Star } from "lucide-react";
import { deleteTestimonial } from "@/app/admin/clients/actions";
import { SectionCard } from "@/components/admin/field";
import { DeleteButton } from "@/components/admin/delete-button";

type Testimonial = {
  id: string;
  author: string | null;
  role: string | null;
  body: string;
  rating: number | null;
  consent: boolean;
  createdAt: string; // ISO
};

export function TestimonialsView({
  clientId,
  testimonials,
}: {
  clientId: string;
  testimonials: Testimonial[];
}) {
  return (
    <SectionCard
      title="Feedback & testimonials"
      description="Submitted by the client from their portal. A “Shareable” tag means they consented to public use."
    >
      {testimonials.length === 0 ? (
        <p className="text-muted-foreground text-sm">No feedback yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-background rounded-xl border p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">
                    {t.author ?? "Anonymous"}
                  </span>
                  {t.role ? (
                    <span className="text-muted-foreground text-[0.72rem]">
                      {t.role}
                    </span>
                  ) : null}
                  {t.consent ? (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[0.62rem] font-medium text-emerald-600">
                      Shareable
                    </span>
                  ) : null}
                  {t.rating ? (
                    <span className="text-muted-foreground inline-flex items-center gap-0.5 text-[0.72rem]">
                      <Star className="size-3 fill-current" />
                      {t.rating}
                    </span>
                  ) : null}
                </div>
                <DeleteButton
                  action={deleteTestimonial}
                  fields={{ id: t.id, clientId }}
                  confirm="Delete this feedback? This cannot be undone."
                />
              </div>
              <p className="text-foreground/90 mt-1.5 text-[0.9rem] leading-6 whitespace-pre-wrap">
                {t.body}
              </p>
              <p className="text-muted-foreground mt-2 text-[0.68rem] tabular-nums">
                {t.createdAt.slice(0, 10)}
              </p>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}
