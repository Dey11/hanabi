export type WorkProjectImage = {
  src: string;
  alt: string;
  mobileSrc?: string;
};

/**
 * Layout follows image count (see `work-card-gallery.tsx`):
 * 1 — centered inset tile
 * 2 — side-by-side on desktop, stacked on mobile.
 * 3 — 2 side-by-side on top, 1 centered below.
 * 4 — 2×2 grid.
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
        src: "/projects/dtc1.png",
        alt: "Down The Cove hero screen",
      },
      {
        src: "/projects/dtc2.png",
        alt: "Down The Cove feature section",
      },
      {
        src: "/projects/dtc3.png",
        alt: "Down The Cove overview",
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
    title: "GOT NEXT",
    category: "WEB APP | PRODUCT UI",
    description:
      "A clean and focused product interface designed to help users discover, track, and engage with what matters most.",
    images: [
      {
        src: "/projects/gotnextHero.png",
        alt: "Got Next hero screen",
      },
      {
        src: "/projects/gotnextDashboard.png",
        alt: "Got Next dashboard overview",
      },
    ],
  },
  {
    title: "LEADLY",
    category: "WEB APP | PRODUCT UI",
    description:
      "A streamlined lead management platform designed to help teams track, nurture, and convert prospects with clarity and speed.",
    images: [
      {
        src: "/projects/leadly1.png",
        alt: "Leadly dashboard overview",
      },
      {
        src: "/projects/leadly2.png",
        alt: "Leadly lead details view",
      },
    ],
  },
  {
    title: "THOMAS BEWICK",
    category: "WEBSITE | BRANDING",
    description:
      "A refined editorial web presence honouring the legacy of a master engraver—balancing heritage craft with modern digital storytelling.",
    images: [
      {
        src: "/projects/thomasbewick1.png",
        alt: "Thomas Bewick hero and gallery",
      },
      {
        src: "/projects/thomasbewick2.png",
        alt: "Thomas Bewick engraving detail",
      },
    ],
  },
];
