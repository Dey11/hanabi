export type WorkProjectImage = {
  src: string;
  alt: string;
  mobileSrc?: string;
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
    title: "DOWN THE COVE",
    category: "WEBSITE | LANDING",
    description:
      "A fresh landing experience designed to capture the brand's coastal calm and community-driven story.",
    images: [
      {
        src: "/projects/DownTheCove.png",
        alt: "Down The Cove landing page preview",
        mobileSrc: "/projects/downthecoveSmall.png",
      },
    ],
  },
  {
    title: "BALLARAT BOX SPORTS",
    category: "WEBSITE | LANDING",
    description:
      "A bold and energetic digital presence built for a community-driven sports brand that lives and breathes competition.",
    images: [
      {
        src: "/projects/ballaratboxsports1.png",
        alt: "Ballarat Box Sports hero screen",
      },
      {
        src: "/projects/ballaratboxsports2.png",
        alt: "Ballarat Box Sports feature section",
      },
      {
        src: "/projects/ballaratboxsports3.png",
        alt: "Ballarat Box Sports overview",
      },
    ],
  },
  {
    title: "TRADE MOAI",
    category: "WEB APP | PRODUCT UI",
    description:
      "A sleek trading interface designed for clarity under pressure—where every data point and decision matters.",
    images: [
      {
        src: "/projects/tradeMoai1.png",
        alt: "Trade Moai dashboard overview",
      },
      {
        src: "/projects/tradeMoai2.png",
        alt: "Trade Moai analytics panel",
      },
    ],
  },
];
