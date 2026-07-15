/**
 * Seeds the portal with a few sample clients so the UI is explorable
 * before real data is entered through the admin.
 *
 *   bun run prisma/seed.ts   (or: bunx prisma db seed)
 *
 * Re-runnable: brand data (colors, fonts, assets, docs, updates) is refreshed
 * on each run. Client passwords and any submitted testimonials are preserved.
 * Set PORTAL_SEED_CLIENT=<slug> to refresh one client only.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import {
  AssetKind,
  AssetTheme,
  UpdateSource,
} from "../lib/generated/prisma/enums";

type Color = { name: string; value: string; role?: string; group?: string };
type Font = {
  name: string;
  category: string;
  weights?: string;
  specimen?: string;
  bodySpecimen?: string;
};
type Asset = {
  name: string;
  kind: AssetKind;
  url: string;
  mime?: string;
  theme?: AssetTheme;
  sizes?: string;
};

type SeedClient = {
  slug: string;
  name: string;
  tagline: string;
  accentColor: string;
  logoUrl?: string;
  password: string;
  colors: Color[];
  fonts: Font[];
  assets: Asset[];
  docs: { title: string; slug: string; category: string; contentMd: string }[];
  updates: { title: string; bodyMd: string; tag: string }[];
};

const LOGO =
  "https://pub-f870ea32a227460d9c0d65fc419082a8.r2.dev/placeholder-logo.svg";
const GOTNEXT_WORDMARK = "/portal/gotnext/gotnext-logo.svg";
const GOTNEXT_ICON = "/portal/gotnext/gotnext-favicon.svg";

const clients: SeedClient[] = [
  {
    slug: "gotnext",
    name: "GotNext",
    tagline: "Competition operations, built for the next play.",
    accentColor: "#E63946",
    logoUrl: GOTNEXT_ICON,
    password: "gotnext-2026",
    colors: [
      {
        group: "Core",
        name: "Arena Black",
        value: "#0A0A0A",
        role: "Page canvas / depth",
      },
      {
        group: "Core",
        name: "Competition White",
        value: "#FAFAFA",
        role: "Primary copy / wordmark",
      },
      {
        group: "Signal",
        name: "GotNext Red",
        value: "#E63946",
        role: "Primary actions / live state",
      },
      {
        group: "Signal",
        name: "Opponent Blue",
        value: "#2563EB",
        role: "Comparison / secondary signal",
      },
      {
        group: "Surfaces",
        name: "Card Surface",
        value: "#141414",
        role: "Panels and cards",
      },
      {
        group: "Surfaces",
        name: "Raised Surface",
        value: "#1F1F1F",
        role: "Hover states and insets",
      },
      {
        group: "Surfaces",
        name: "Quiet Border",
        value: "#242424",
        role: "Surface edges",
      },
    ],
    fonts: [
      {
        name: "GT America Standard",
        category: "Sans / Body + headings",
        weights: "400, 500, 700",
        specimen: "Run the next play.",
        bodySpecimen:
          "The primary voice for navigation, body copy, page headings, and product controls.",
      },
      {
        name: "GT America Condensed",
        category: "Display / events",
        weights: "400, 500, 700, 800",
        specimen: "PLAY FOR MORE.",
        bodySpecimen:
          "Use for event names, display moments, and high-energy competition surfaces.",
      },
      {
        name: "GT America Mono",
        category: "Mono / records",
        weights: "400, 500, 700",
        specimen: "03 · 48 MIN · 5v5",
        bodySpecimen:
          "Use for scores, timers, ELO, ranks, seeds, IDs, and other tabular data.",
      },
    ],
    assets: [
      {
        name: "GotNext Wordmark",
        kind: AssetKind.LOGO,
        url: GOTNEXT_WORDMARK,
        mime: "image/svg+xml",
        theme: AssetTheme.LIGHT,
        sizes: "256,512,1024",
      },
      {
        name: "GotNext Brand Mark",
        kind: AssetKind.ICON,
        url: GOTNEXT_ICON,
        mime: "image/svg+xml",
        theme: AssetTheme.DARK,
      },
    ],
    docs: [
      {
        title: "Brand foundations",
        slug: "brand-foundations",
        category: "Brand system",
        contentMd:
          "# Brand foundations\n\nGotNext is a competition-native product. The system carries its identity through **deep contrast, compact hierarchy, and clear signals** rather than decorative UI.\n\n## Core palette\n\n- **Arena Black** is the page canvas.\n- **Competition White** is primary copy and wordmark ink.\n- **GotNext Red** marks action and live state.\n- **Opponent Blue** is a comparison signal, not a second primary.\n\n## Surface scale\n\nUse the canvas, card, and raised-surface tokens to create depth. Keep borders quiet and let the hierarchy do the work.",
      },
      {
        title: "Type and UI rules",
        slug: "type-and-ui-rules",
        category: "Brand system",
        contentMd:
          "# Type and UI rules\n\n## Typography\n\n- **GT America Standard** handles interface copy, headings, and navigation.\n- **GT America Condensed** is reserved for display and event moments.\n- **GT America Mono** is for true data: scores, ELO, ranks, seeds, IDs, and timers.\n\n## Components\n\nReduce text before adding UI. Cards should scan like competition panels: compact metadata, a stable action position, and clear status. Use red to communicate action or live state, not as decoration.\n\n## Accessibility\n\nMaintain visible focus, sufficient contrast, and labels that explain controls without repeating what the layout already makes clear.",
      },
    ],
    updates: [
      {
        title: "Design system imported",
        bodyMd:
          "GotNext brand tokens, type roles, and downloadable marks are now available in the portal.",
        tag: "Design",
      },
      {
        title: "Client portal initialized",
        bodyMd:
          "The portal now contains the focused brand-system reference for the current product surface.",
        tag: "Portal",
      },
    ],
  },
  {
    slug: "aurora",
    name: "Aurora Labs",
    tagline: "Research tooling for the curious.",
    accentColor: "#5B6CFF",
    password: "aurora-2026",
    colors: [
      { group: "Core", name: "Aurora", value: "#5B6CFF", role: "Primary" },
      {
        group: "Core",
        name: "Deep",
        value: "#0B1020",
        role: "Text / dark surfaces",
      },
      { group: "Core", name: "Mist", value: "#F4F6FB", role: "Backgrounds" },
      { group: "Accent", name: "Signal", value: "#00C2A8", role: "Highlights" },
      { group: "Neutral", name: "Fog", value: "#C7CCD9", role: "Borders" },
    ],
    fonts: [
      {
        name: "Inter",
        category: "Sans / Body",
        weights: "400, 500, 700",
        specimen: "Think in systems.",
        bodySpecimen:
          "Aurora Labs builds research tooling that keeps pace with your thinking — fast capture, structured recall, and calm defaults.",
      },
    ],
    assets: [
      {
        name: "Aurora Logo — Light",
        kind: AssetKind.LOGO,
        url: LOGO,
        mime: "image/svg+xml",
        theme: AssetTheme.LIGHT,
        sizes: "256,512",
      },
      {
        name: "Aurora Logo — Dark",
        kind: AssetKind.LOGO,
        url: LOGO,
        mime: "image/svg+xml",
        theme: AssetTheme.DARK,
        sizes: "256,512",
      },
    ],
    docs: [
      {
        title: "Project overview",
        slug: "overview",
        category: "Handoff",
        contentMd:
          "# Project overview\n\nAurora Labs is a research tooling suite. This document orients your team.\n\n## Architecture\n\n- Next.js app router\n- Postgres via Prisma\n- Edge-rendered marketing, node-rendered app\n\n## Contacts\n\nReach the studio lead for anything blocking.",
      },
    ],
    updates: [
      {
        title: "Kickoff",
        bodyMd: "Discovery complete. Moodboards approved.",
        tag: "Milestone",
      },
    ],
  },
  {
    slug: "marigold",
    name: "Marigold & Co.",
    tagline: "Slow goods, made well.",
    accentColor: "#E8B23A",
    password: "marigold-2026",
    colors: [
      { group: "Core", name: "Marigold", value: "#E8B23A", role: "Primary" },
      { group: "Core", name: "Clay", value: "#3A2E23", role: "Text" },
      { group: "Core", name: "Cream", value: "#FBF7EE", role: "Backgrounds" },
      { group: "Accent", name: "Sage", value: "#8A9A5B", role: "Secondary" },
    ],
    fonts: [
      {
        name: "Geist",
        category: "Sans / Body",
        weights: "400, 500",
        specimen: "Made to last.",
        bodySpecimen:
          "Marigold & Co. makes slow goods for people who notice the details. Every piece is built to be kept, not replaced.",
      },
    ],
    assets: [
      {
        name: "Marigold Logo",
        kind: AssetKind.LOGO,
        url: LOGO,
        mime: "image/svg+xml",
        theme: AssetTheme.LIGHT,
        sizes: "512,1024",
      },
    ],
    docs: [
      {
        title: "Brand voice",
        slug: "brand-voice",
        category: "Handoff",
        contentMd:
          "# Brand voice\n\nWarm, unhurried, and honest. Write like a maker talking to a friend.\n\n- **Do** use plain words\n- **Don't** oversell\n",
      },
    ],
    updates: [
      {
        title: "Storefront live",
        bodyMd: "The Shopify storefront is live with the new theme.",
        tag: "Build",
      },
    ],
  },
];

async function main() {
  const selectedSlug = process.env.PORTAL_SEED_CLIENT?.trim().toLowerCase();
  const clientsToSeed = selectedSlug
    ? clients.filter((client) => client.slug === selectedSlug)
    : clients;

  if (selectedSlug && clientsToSeed.length === 0) {
    throw new Error(`No sample client found for slug: ${selectedSlug}`);
  }

  for (const c of clientsToSeed) {
    const passwordHash = await bcrypt.hash(c.password, 12);

    const client = await db.client.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        tagline: c.tagline,
        accentColor: c.accentColor,
        logoUrl: c.logoUrl ?? LOGO,
      },
      create: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        accentColor: c.accentColor,
        logoUrl: c.logoUrl ?? LOGO,
        passwordHash,
      },
      select: { id: true },
    });

    // Refresh brand data (leave testimonials untouched).
    await db.$transaction([
      db.brandColor.deleteMany({ where: { clientId: client.id } }),
      db.brandFont.deleteMany({ where: { clientId: client.id } }),
      db.asset.deleteMany({ where: { clientId: client.id } }),
      db.doc.deleteMany({ where: { clientId: client.id } }),
      db.update.deleteMany({ where: { clientId: client.id } }),
    ]);

    await db.client.update({
      where: { id: client.id },
      data: {
        colors: {
          create: c.colors.map((color, i) => ({ ...color, order: i })),
        },
        fonts: { create: c.fonts.map((font, i) => ({ ...font, order: i })) },
        assets: { create: c.assets.map((a, i) => ({ ...a, order: i })) },
        docs: { create: c.docs.map((doc, i) => ({ ...doc, order: i })) },
        updates: {
          create: c.updates.map((u) => ({ ...u, source: UpdateSource.MANUAL })),
        },
      },
    });

    console.log(`✓ ${c.name}  →  slug: ${c.slug}`);
  }
  console.log("\nSeed complete. Log in at /portal with the client details above.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
