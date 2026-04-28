export type WorkProjectImage = {
  src: string;
  alt: string;
};

/**
 * Layout follows image count (see `work-card-gallery.tsx`):
 * 1 — centered inset tile
 * 2 — top-left (back) + bottom-right (front)
 * 3 — top-left, middle-right, bottom-left (front)
 * 4 — 2×2 grid, row order: [0][1] / [2][3]
 */
export type WorkProjectImages =
  | readonly [WorkProjectImage]
  | readonly [WorkProjectImage, WorkProjectImage]
  | readonly [WorkProjectImage, WorkProjectImage, WorkProjectImage]
  | readonly [
      WorkProjectImage,
      WorkProjectImage,
      WorkProjectImage,
      WorkProjectImage,
    ];

export type WorkProject = {
  title: string;
  category: string;
  description: string;
  images: WorkProjectImages;
};

export const workProjects: readonly WorkProject[] = [
  {
    title: "TAKEUFORWARD",
    category: "WEBSITE | LANDING REVAMP",
    description:
      "We helped takeUforward a computer science education platform clarify their value proposition with a strategic landing revamp.",
    images: [
      {
        src: "/hero-projects/tuf.png",
        alt: "takeUforward landing hero and headline",
      },
      {
        src: "/hero-projects/tuf.png",
        alt: "takeUforward product dashboard preview",
      },
    ],
  },
  {
    title: "NECTAR",
    category: "WEB APP | PRODUCT UI",
    description:
      "We partnered with Nectar on interface craft and flows that feel calm and intentional—balancing dense product surfaces with breathable layout and hierarchy.",
    images: [
      {
        src: "/hero-projects/nectar.png",
        alt: "Nectar product interface preview",
      },
    ],
  },
  {
    title: "PDX WORKSHOP",
    category: "BRAND | MULTI-SURFACE",
    description:
      "A three-tile stagger: back layer top-left, middle-right cross, strongest overlap from the bottom—built for editorial multi-capture stories.",
    images: [
      { src: "/hero-projects/pdx.png", alt: "PDX workshop primary screen" },
      { src: "/hero-projects/nectar.png", alt: "PDX supporting surface A" },
      { src: "/hero-projects/tuf.png", alt: "PDX supporting surface B" },
    ],
  },
  {
    title: "STUDIO SAMPLE",
    category: "CASE STUDY | FOUR-UP",
    description:
      "Four captures in a clean 2×2 grid—uniform gutters, no overlap—so each surface reads clearly at a glance.",
    images: [
      { src: "/hero-projects/nectar.png", alt: "Studio sample frame one" },
      { src: "/hero-projects/pdx.png", alt: "Studio sample frame two" },
      { src: "/hero-projects/tuf.png", alt: "Studio sample frame three" },
      { src: "/hero-projects/nectar.png", alt: "Studio sample frame four" },
    ],
  },
];
