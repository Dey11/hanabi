import WorkCardGallery from "@/components/work-card-gallery";
import type { WorkProjectImages } from "@/data/work-projects";

export type WorkCardProps = {
  title: string;
  category: string;
  description: string;
  images: WorkProjectImages;
};

export default function WorkCard({
  title,
  category,
  description,
  images,
}: WorkCardProps) {
  return (
    <article className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#6C6C6C] sm:text-xs">
          <span className="min-w-0 text-pretty">{title}</span>
          <span className="shrink-0 text-right">{category}</span>
        </div>

        <div className="overflow-hidden rounded-t-2xl rounded-b-none border border-[#E0E0E0] bg-[#F9F9F9]">
          <div className="p-4 sm:p-5 md:p-6">
            <WorkCardGallery images={images} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-t-none rounded-b-2xl border border-[#E0E0E0] bg-[#F9F9F9] px-5 py-4 sm:px-8 sm:py-5">
        <p className="font-inter max-w-2xl text-center text-base leading-relaxed font-normal text-[#1a1a1a] sm:text-[17px]">
          {description}
        </p>
      </div>
    </article>
  );
}
