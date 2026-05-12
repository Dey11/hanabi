import type { ReactNode } from "react";

import type { WorkProjectImage } from "@/data/work-projects";
import RevealImage from "@/components/reveal-image";

type GalleryProps = {
  images: readonly WorkProjectImage[];
  mobileImageCorners?: "rounded" | "square";
  mobileThreeLayout?: "stacked" | "side-by-side";
  desktopThreeLayout?: "overlap" | "side-by-side";
};

/** Shared canvas — taller so tiles read at portfolio scale */
const galleryViewport =
  "relative h-[320px] w-full sm:h-[440px] md:h-[420px] lg:h-[500px] xl:h-[540px]";

function TileFill({
  image,
  mobileImageCorners = "rounded",
  sizes,
}: {
  image: WorkProjectImage;
  mobileImageCorners?: "rounded" | "square";
  sizes: string;
}) {
  const radiusClass = "rounded-none";

  return (
    <div
      className={`relative h-full min-h-0 w-full overflow-hidden ${radiusClass}`}
    >
      {image.mobileSrc && (
        <div className="absolute inset-0 block sm:hidden">
          <RevealImage
            src={image.mobileSrc}
            alt={image.alt}
            fill
            loading="lazy"
            sizes={sizes}
            className={`${radiusClass} object-contain`}
            wrapperClassName="absolute inset-0"
          />
        </div>
      )}
      <div
        className={`absolute inset-0 ${image.mobileSrc ? "hidden sm:block" : ""}`}
      >
        <RevealImage
          src={image.src}
          alt={image.alt}
          fill
          loading="lazy"
          sizes={sizes}
          className={`${radiusClass} object-contain`}
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

function GalleryOne({
  image,
  mobileImageCorners,
}: {
  image: WorkProjectImage;
  mobileImageCorners?: "rounded" | "square";
}) {
  return (
    <div className="flex h-full w-full items-center justify-center px-1 sm:px-2">
      <div className="relative aspect-16/10 h-[88%] w-auto max-w-[92%]">
        <TileFill
          image={image}
          mobileImageCorners={mobileImageCorners}
          sizes="(max-width: 1152px) 85vw, 900px"
        />
      </div>
    </div>
  );
}

function GalleryTwo({
  images,
  mobileImageCorners,
}: {
  images: readonly [WorkProjectImage, WorkProjectImage];
  mobileImageCorners?: "rounded" | "square";
}) {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-3 p-3 sm:flex-row sm:gap-4 sm:p-4 md:hidden">
        <div className="relative flex-1">
          <TileFill
            image={images[0]}
            mobileImageCorners={mobileImageCorners}
            sizes="(max-width: 640px) 85vw, 42vw"
          />
        </div>
        <div className="relative flex-1">
          <TileFill
            image={images[1]}
            mobileImageCorners={mobileImageCorners}
            sizes="(max-width: 640px) 85vw, 42vw"
          />
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
  mobileImageCorners,
  mobileLayout = "stacked",
  desktopLayout = "overlap",
}: {
  images: readonly [WorkProjectImage, WorkProjectImage, WorkProjectImage];
  mobileImageCorners?: "rounded" | "square";
  mobileLayout?: "stacked" | "side-by-side";
  desktopLayout?: "overlap" | "side-by-side";
}) {
  const collageTileClass =
    "aspect-[1440/1024] shadow-[0_18px_44px_-30px_rgba(0,0,0,0.55)]";

  return (
    <>
      {mobileLayout === "side-by-side" ? (
        <div className="grid h-full w-full grid-cols-[0.78fr_1.55fr_0.78fr] items-center gap-2 p-2 sm:gap-3 sm:p-4 md:hidden">
          <div className="relative h-full min-h-0">
            <TileFill
              image={images[0]}
              mobileImageCorners={mobileImageCorners}
              sizes="(max-width: 640px) 24vw, 24vw"
            />
          </div>
          <div className="relative h-full min-h-0">
            <TileFill
              image={images[1]}
              mobileImageCorners={mobileImageCorners}
              sizes="(max-width: 640px) 46vw, 42vw"
            />
          </div>
          <div className="relative h-full min-h-0">
            <TileFill
              image={images[2]}
              mobileImageCorners={mobileImageCorners}
              sizes="(max-width: 640px) 24vw, 24vw"
            />
          </div>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:hidden">
          {[images[0], images[2]].map((image) => (
            <div key={image.src} className="relative min-h-0 flex-1">
              <TileFill
                image={image}
                mobileImageCorners={mobileImageCorners}
                sizes="(max-width: 640px) 82vw, 42vw"
              />
            </div>
          ))}
        </div>
      )}

      {desktopLayout === "side-by-side" ? (
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
      ) : (
        <div className="relative hidden h-full w-full items-center justify-center md:flex">
          <div className="relative h-[88%] w-[94%] max-w-[1320px] lg:h-[90%] lg:w-[90%] xl:h-[92%] xl:w-[88%]">
            <div
              className={`absolute top-[7%] left-[5%] z-20 w-[44%] lg:top-[5%] lg:left-[7%] lg:w-[41%] xl:top-[3%] xl:left-[8%] xl:w-[39%] ${collageTileClass}`}
            >
              <TileFill
                image={images[0]}
                sizes="(max-width: 1024px) 42vw, (max-width: 1280px) 37vw, 560px"
              />
            </div>
            <div
              className={`absolute top-[24%] right-[5%] z-30 w-[44%] lg:top-[22%] lg:right-[7%] lg:w-[41%] xl:top-[21%] xl:right-[8%] xl:w-[39%] ${collageTileClass}`}
            >
              <TileFill
                image={images[1]}
                sizes="(max-width: 1024px) 42vw, (max-width: 1280px) 37vw, 560px"
              />
            </div>
            <div
              className={`absolute bottom-[7%] left-1/2 z-40 w-[40%] -translate-x-1/2 lg:bottom-[5%] lg:w-[38%] xl:bottom-[3%] xl:w-[36%] ${collageTileClass}`}
            >
              <TileFill
                image={images[2]}
                sizes="(max-width: 1024px) 38vw, (max-width: 1280px) 34vw, 520px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function GalleryFour({
  images,
  mobileImageCorners,
}: {
  images: readonly [
    WorkProjectImage,
    WorkProjectImage,
    WorkProjectImage,
    WorkProjectImage,
  ];
  mobileImageCorners?: "rounded" | "square";
}) {
  return (
    <div className="grid h-full min-h-0 w-full grid-cols-2 grid-rows-2 gap-2.5 sm:gap-3 md:gap-4">
      {images.map((image, i) => (
        <TileFill
          key={`${image.src}-${i}`}
          image={image}
          mobileImageCorners={mobileImageCorners}
          sizes="(max-width: 1152px) 48vw, 640px"
        />
      ))}
    </div>
  );
}

export default function WorkCardGallery({
  images,
  mobileImageCorners = "rounded",
  mobileThreeLayout = "stacked",
  desktopThreeLayout = "overlap",
}: GalleryProps) {
  let inner: ReactNode;

  switch (images.length) {
    case 1:
      inner = (
        <GalleryOne image={images[0]} mobileImageCorners={mobileImageCorners} />
      );
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
          mobileImageCorners={mobileImageCorners}
        />
      );
      break;
    case 3:
      inner = (
        <GalleryThree
          mobileLayout={mobileThreeLayout}
          desktopLayout={desktopThreeLayout}
          images={
            [images[0], images[1], images[2]] as readonly [
              WorkProjectImage,
              WorkProjectImage,
              WorkProjectImage,
            ]
          }
          mobileImageCorners={mobileImageCorners}
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
          mobileImageCorners={mobileImageCorners}
        />
      );
      break;
    default:
      inner = null;
  }

  return <div className={galleryViewport}>{inner}</div>;
}
