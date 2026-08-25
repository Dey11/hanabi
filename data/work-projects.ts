import { marketingAssetUrl } from "@/lib/marketing-assets";

export type WorkProjectImage = {
  src: string;
  alt: string;
  mobileSrc?: string;
};

export type WorkProjectContributor =
  | "krish"
  | "roy"
  | "dey"
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
  liveUrl?: string;
};

export const workProjects: readonly WorkProject[] = [
  {
    title: "TRADE MOAI",
    category: "WEB APP | PRODUCT UI",
    description:
      "A focused trading interface concept designed around fast scanning, clear positions, and confident decision-making.",
    contributors: ["krish", "dey"],
    images: [
      {
        src: marketingAssetUrl("projects/tradeMoai1.png"),
        alt: "Trade Moai interface overview",
      },
      {
        src: marketingAssetUrl("projects/tradeMoai2.png"),
        alt: "Trade Moai trading dashboard",
      },
    ],
  },
  {
    title: "DOWN THE COVE",
    category: "WEBSITE | LANDING",
    liveUrl: "https://dtc.cooldash.xyz",
    description:
      "A fresh landing experience designed to capture the brand's coastal calm and community-driven story.",
    contributors: ["krish", "dey"],
    images: [
      {
        src: marketingAssetUrl("projects/dtc1.png"),
        alt: "Down The Cove hero screen",
      },
      {
        src: marketingAssetUrl("projects/dtc2.png"),
        alt: "Down The Cove feature section",
      },
      {
        src: marketingAssetUrl("projects/dtc3.png"),
        alt: "Down The Cove overview",
      },
    ],
  },
  {
    title: "BALLARAT BOX SPORTS",
    category: "WEBSITE | LANDING",
    liveUrl: "https://ballaratsports.vercel.app",
    description:
      "A bold and energetic digital presence built for a community-driven sports brand that lives and breathes competition.",
    contributors: ["krish", "dey"],
    images: [
      {
        src: marketingAssetUrl("projects/ballaratboxsports1.png"),
        alt: "Ballarat Box Sports hero screen",
      },
      {
        src: marketingAssetUrl("projects/ballaratboxsports2.png"),
        alt: "Ballarat Box Sports feature section",
      },
      {
        src: marketingAssetUrl("projects/ballaratboxsports3.png"),
        alt: "Ballarat Box Sports overview",
      },
    ],
  },
  {
    title: "WABISABI",
    category: "WEBSITE | BRANDING",
    liveUrl: "https://wabisabi.pics",
    description:
      "A calm, tactile web experience shaped around imperfect beauty, considered details, and a quietly memorable brand presence.",
    contributors: ["dey", "sagarika"],
    images: [
      {
        src: marketingAssetUrl("projects/wabisabi1.png"),
        alt: "Wabisabi hero screen",
      },
      {
        src: marketingAssetUrl("projects/wabisabi2.png"),
        alt: "Wabisabi feature section",
      },
      {
        src: marketingAssetUrl("projects/wabisabi3.png"),
        alt: "Wabisabi brand detail",
      },
    ],
  },
  {
    title: "GOT NEXT",
    category: "WEB APP | PRODUCT UI",
    liveUrl: "https://gotnext.gg",
    description:
      "A clean and focused product interface designed to help users discover, track, and engage with what matters most.",
    contributors: ["krish"],
    images: [
      {
        src: marketingAssetUrl("projects/gotnextHero.png"),
        alt: "Got Next hero screen",
      },
      {
        src: marketingAssetUrl("projects/gotnextDashboard.png"),
        alt: "Got Next dashboard overview",
      },
    ],
  },
  {
    title: "THOMAS BEWICK",
    category: "WEBSITE | BRANDING",
    liveUrl: "https://thomasbewick.co.uk",
    description:
      "A refined editorial web presence honouring the legacy of a master engraver - balancing heritage craft with modern digital storytelling.",
    contributors: ["dey", "sagarika"],
    images: [
      {
        src: marketingAssetUrl("projects/thomasbewick1.png"),
        alt: "Thomas Bewick hero and gallery",
      },
      {
        src: marketingAssetUrl("projects/thomasbewick2.png"),
        alt: "Thomas Bewick engraving detail",
      },
    ],
  },
  {
    title: "LEADLY",
    category: "WEB APP | PRODUCT UI",
    liveUrl: "https://leadly.live",
    description:
      "A streamlined lead management platform designed to help teams track, nurture, and convert prospects with clarity and speed.",
    contributors: ["arsh", "roy"],
    images: [
      {
        src: marketingAssetUrl("projects/leadly1.png"),
        alt: "Leadly dashboard overview",
      },
      {
        src: marketingAssetUrl("projects/leadly2.png"),
        alt: "Leadly lead details view",
      },
    ],
  },
];
