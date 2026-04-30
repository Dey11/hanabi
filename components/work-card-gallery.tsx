import type { ReactNode } from "react";

import type { WorkProjectImage } from "@/data/work-projects";
import RevealImage from "@/components/reveal-image";

type GalleryProps = {
  images: readonly WorkProjectImage[];
};

/** Shared canvas — taller so tiles read at portfolio scale */
const galleryViewport = "relative h-[320px] w-full sm:h-[440px] md:h-[540px]";

const shell = "overflow-hidden rounded-xl";

function TileFill({
  image,
  sizes,
}: {
  image: WorkProjectImage;
  sizes: string;
}) {
  return (
    <div className={`relative h-full min-h-0 w-full ${shell}`}>
      {image.mobileSrc && (
        <div className="absolute inset-0 block sm:hidden">
          <RevealImage
            src={image.mobileSrc}
            alt={image.alt}
            fill
            sizes={sizes}
            className="rounded-xl object-contain"
            wrapperClassName="absolute inset-0"
          />
        </div>
      )}
      <div className={`absolute inset-0 ${image.mobileSrc ? "hidden sm:block" : ""}`}>
        <RevealImage
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="rounded-xl object-contain"
          wrapperClassName="absolute inset-0"
        />
      </div>
    </div>
  );
}

/**
 * Layout rules (wireframe):
 * 1 — single large tile centered with margin.
 * 2 — side-by-side on desktop, stacked vertically on mobile.
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
    <>
      <div className="flex h-full w-full flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4 md:hidden">
        <div className="relative flex-1">
          <TileFill image={images[0]} sizes="(max-width: 640px) 85vw, 42vw" />
        </div>
        <div className="relative flex-1">
          <TileFill image={images[1]} sizes="(max-width: 640px) 85vw, 42vw" />
        </div>
      </div>

      <div className="relative hidden h-full w-full md:block">
        <div className="absolute top-[4%] left-[4%] z-10 h-[72%] w-[56%]">
          <TileFill image={images[0]} sizes="(max-width: 1152px) 56vw, 640px" />
        </div>

        <div className="absolute right-[4%] bottom-[4%] z-20 h-[72%] w-[56%]">
          <TileFill image={images[1]} sizes="(max-width: 1152px) 56vw, 640px" />
        </div>
      </div>
    </>
  );
}

function GalleryThree({
  images,
}: {
  images: readonly [WorkProjectImage, WorkProjectImage, WorkProjectImage];
}) {
  return (
    <>
      {/* Mobile / Tablet: 2 on top, 1 below centered */}
      <div className="flex h-full w-full flex-col gap-3 p-3 sm:grid sm:grid-cols-2 sm:grid-rows-2 sm:gap-2 sm:p-4 md:hidden">
        <div className="relative min-h-0">
          <TileFill image={images[0]} sizes="42vw" />
        </div>
        <div className="relative hidden min-h-0 sm:block">
          <TileFill image={images[1]} sizes="42vw" />
        </div>
        <div className="relative col-span-1 min-h-0 sm:col-span-2 sm:flex sm:justify-center">
          <div className="relative h-full w-full sm:w-3/5">
            <TileFill image={images[2]} sizes="42vw" />
          </div>
        </div>
      </div>

      {/* Desktop: 3 side by side */}
      <div className="hidden h-full w-full gap-4 p-5 md:flex">
        <div className="relative flex-1">
          <TileFill image={images[0]} sizes="33vw" />
        </div>
        <div className="relative flex-1">
          <TileFill image={images[1]} sizes="33vw" />
        </div>
        <div className="relative flex-1">
          <TileFill image={images[2]} sizes="33vw" />
        </div>
      </div>
    </>
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
