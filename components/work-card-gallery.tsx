import type { ReactNode } from "react";

import type { WorkProjectImage } from "@/data/work-projects";
import RevealImage from "@/components/reveal-image";

type GalleryProps = {
  images: readonly WorkProjectImage[];
};

/** Shared canvas — taller so tiles read at portfolio scale */
const galleryViewport = "relative h-[320px] w-full sm:h-[440px] md:h-[540px]";

const shell =
  "overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-black/[0.06]";

function TileFill({
  image,
  sizes,
}: {
  image: WorkProjectImage;
  sizes: string;
}) {
  return (
    <div className={`relative h-full min-h-0 w-full ${shell}`}>
      <RevealImage
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        className="object-cover object-top"
        wrapperClassName="absolute inset-0"
      />
    </div>
  );
}

/**
 * Layout rules (wireframe):
 * 1 — single large tile centered with margin.
 * 2 — img[0] top-left back (larger); img[1] bottom-right front (overlaps).
 * 3 — stacked collage; img[2] foremost at bottom.
 * 4 — 2×2 grid.
 */

function GalleryOne({ image }: { image: WorkProjectImage }) {
  return (
    <div className="flex h-full w-full items-center justify-center px-1 sm:px-2">
      <div className="relative aspect-16/10 h-[88%] w-auto max-w-[92%]">
        <TileFill image={image} sizes="(max-width: 1152px) 85vw, 900px" />
      </div>
    </div>
  );
}

function GalleryTwo({
  images,
}: {
  images: readonly [WorkProjectImage, WorkProjectImage];
}) {
  return (
    <div className="relative h-full w-full px-2 pt-1 pb-2 sm:px-4 sm:pb-4 md:px-5 md:pb-5">
      {/* Back — top-left, larger */}
      <div className="absolute top-[4%] left-[3%] z-10 aspect-16/10 h-[66%] w-auto max-w-[78%]">
        <TileFill image={images[0]} sizes="48vw" />
      </div>
      {/* Front — bottom-right, sits on top with overlap */}
      <div className="absolute right-[3%] bottom-[4%] z-20 aspect-16/10 h-[60%] w-auto max-w-[74%]">
        <TileFill image={images[1]} sizes="48vw" />
      </div>
    </div>
  );
}

function GalleryThree({
  images,
}: {
  images: readonly [WorkProjectImage, WorkProjectImage, WorkProjectImage];
}) {
  return (
    <div className="relative h-full w-full px-2 pt-1 pb-2 sm:px-4 sm:pb-4 md:px-5 md:pb-5">
      <div className="absolute top-[4%] left-[3%] z-10 aspect-16/10 h-[58%] w-auto max-w-[72%]">
        <TileFill image={images[0]} sizes="42vw" />
      </div>
      <div className="absolute top-[12%] right-[2%] z-20 aspect-16/10 h-[56%] w-auto max-w-[70%] sm:top-[14%]">
        <TileFill image={images[1]} sizes="42vw" />
      </div>
      <div className="absolute bottom-[3%] left-[14%] z-30 aspect-16/10 h-[56%] w-auto max-w-[70%] sm:left-[18%]">
        <TileFill image={images[2]} sizes="42vw" />
      </div>
    </div>
  );
}

function GalleryFour({
  images,
}: {
  images: readonly [
    WorkProjectImage,
    WorkProjectImage,
    WorkProjectImage,
    WorkProjectImage,
  ];
}) {
  return (
    <div className="grid h-full min-h-0 w-full grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 md:gap-4">
      {images.map((image, i) => (
        <TileFill
          key={`${image.src}-${i}`}
          image={image}
          sizes="(max-width: 1152px) 48vw, 640px"
        />
      ))}
    </div>
  );
}

export default function WorkCardGallery({ images }: GalleryProps) {
  let inner: ReactNode;

  switch (images.length) {
    case 1:
      inner = <GalleryOne image={images[0]} />;
      break;
    case 2:
      inner = (
        <GalleryTwo
          images={
            [images[0], images[1]] as readonly [
              WorkProjectImage,
              WorkProjectImage,
            ]
          }
        />
      );
      break;
    case 3:
      inner = (
        <GalleryThree
          images={
            [images[0], images[1], images[2]] as readonly [
              WorkProjectImage,
              WorkProjectImage,
              WorkProjectImage,
            ]
          }
        />
      );
      break;
    case 4:
      inner = (
        <GalleryFour
          images={
            [images[0], images[1], images[2], images[3]] as readonly [
              WorkProjectImage,
              WorkProjectImage,
              WorkProjectImage,
              WorkProjectImage,
            ]
          }
        />
      );
      break;
    default:
      inner = null;
  }

  return <div className={galleryViewport}>{inner}</div>;
}
