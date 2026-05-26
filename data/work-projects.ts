export type WorkProjectImage = {
  src: string;
  alt: string;
  mobileSrc?: string;
};

export type WorkProjectContributor =
  | "krish"
  | "roy"
  // | "dey"
  | "sagarika"
  | "arsh";

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
  contributors: readonly WorkProjectContributor[];
};

export const workProjects: readonly WorkProject[] = [
  {
    title: "TRADE MOAI",
    category: "WEB APP | PRODUCT UI",
    description:
      "A focused trading interface concept designed around fast scanning, clear positions, and confident decision-making.",
    contributors: ["krish"],
    images: [
      {
        src: "/projects/tradeMoai1.png",
        alt: "Trade Moai interface overview",
      },
      {
        src: "/projects/tradeMoai2.png",
        alt: "Trade Moai trading dashboard",
      },
    ],
  },
  {
    title: "DOWN THE COVE",
    category: "WEBSITE | LANDING",
    description:
      "A fresh landing experience designed to capture the brand's coastal calm and community-driven story.",
    contributors: ["krish"],
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
    contributors: ["krish"],
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
    title: "WABISABI",
    category: "WEBSITE | BRANDING",
    description:
      "A calm, tactile web experience shaped around imperfect beauty, considered details, and a quietly memorable brand presence.",
    contributors: ["sagarika"],
    images: [
      {
        src: "/projects/wabisabi1.png",
        alt: "Wabisabi hero screen",
      },
      {
        src: "/projects/wabisabi2.png",
        alt: "Wabisabi feature section",
      },
      {
        src: "/projects/wabisabi3.png",
        alt: "Wabisabi brand detail",
      },
    ],
  },
  {
    title: "GOT NEXT",
    category: "WEB APP | PRODUCT UI",
    description:
      "A clean and focused product interface designed to help users discover, track, and engage with what matters most.",
    contributors: ["krish"],
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
    title: "THOMAS BEWICK",
    category: "WEBSITE | BRANDING",
    description:
      "A refined editorial web presence honouring the legacy of a master engraver - balancing heritage craft with modern digital storytelling.",
    contributors: ["sagarika"],
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
  {
    title: "LEADLY",
    category: "WEB APP | PRODUCT UI",
    description:
      "A streamlined lead management platform designed to help teams track, nurture, and convert prospects with clarity and speed.",
    contributors: ["arsh", "roy"],
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
];
