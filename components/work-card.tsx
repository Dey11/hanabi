import HangingPaperCranes from "@/components/hanging-paper-cranes";
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
    <article className="flex w-full flex-col">
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4 font-mono text-sm font-medium tracking-[0.06em] text-[#6C6C6C] uppercase sm:text-sm">
          <span className="min-w-0 text-pretty text-black">{title}</span>
          <span className="shrink-0 text-right">{category}</span>
        </div>

        <div className="relative flex flex-col overflow-hidden rounded-xl">
          <HangingPaperCranes
            seed={title}
            variant="card"
            className="hidden md:block"
          />
          <div className="relative z-10 overflow-hidden rounded-t-xl rounded-b-none shadow-xs inset-shadow-sm inset-shadow-black/20">
            <div className="relative z-10 px-6 pt-4 pb-4 sm:px-9 sm:pt-5 sm:pb-5 md:px-12 md:pt-6 md:pb-6">
              <WorkCardGallery
                images={images}
                mobileThreeLayout={
                  title === "DOWN THE COVE" ? "side-by-side" : "stacked"
                }
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="relative z-40 h-2 bg-[#F6F6F6] sm:h-3"
          />

          <div className="relative z-10 flex items-center justify-center rounded-t-none rounded-b-xl px-5 py-3 shadow-sm inset-shadow-sm inset-shadow-black/20 sm:px-8">
            <p className="font-inter max-w-2xl text-center text-base leading-relaxed font-normal text-[#1a1a1a] sm:text-[17px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
