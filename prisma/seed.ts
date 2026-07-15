/**
 * Seeds the portal with a few sample clients so the UI is explorable
 * before real data is entered through the admin.
 *
 *   bun run prisma/seed.ts   (or: bunx prisma db seed)
 *
 * Re-runnable: brand data (colors, fonts, assets, docs, updates) is refreshed
 * on each run. Client passwords and any submitted testimonials are preserved.
 * Each client's portal password is printed at the end.
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
  password: string;
  colors: Color[];
  fonts: Font[];
  assets: Asset[];
  docs: { title: string; slug: string; category: string; contentMd: string }[];
  updates: { title: string; bodyMd: string; tag: string }[];
};

const LOGO =
  "https://pub-f870ea32a227460d9c0d65fc419082a8.r2.dev/placeholder-logo.svg";

const clients: SeedClient[] = [
  {
    slug: "gotnext",
    name: "GotNext",
    tagline: "Pickup basketball, organized.",
    accentColor: "#F0562E",
    password: "gotnext-2026",
    colors: [
      {
        group: "Core",
        name: "Court Orange",
        value: "#F0562E",
        role: "Primary / CTAs",
      },
      { group: "Core", name: "Ink", value: "#141414", role: "Text" },
      { group: "Core", name: "Paper", value: "#FAFAFA", role: "Backgrounds" },
      { group: "Neutral", name: "Line", value: "#E7E7E7", role: "Borders" },
      { group: "Neutral", name: "Slate", value: "#6B7280", role: "Muted text" },
      {
        group: "Accent",
        name: "Hardwood",
        value: "#B7793C",
        role: "Warm accent",
      },
      { group: "Accent", name: "Net", value: "#2FB574", role: "Success" },
    ],
    fonts: [
      {
        name: "Geist",
        category: "Sans / Body",
        weights: "400, 500, 600",
        specimen: "Run the play.",
        bodySpecimen:
          "GotNext turns a group chat into an organized run. Set the time, share a link, and let hoopers claim their spots.",
      },
      {
        name: "Geist Mono",
        category: "Mono / Labels",
        weights: "400, 500",
        specimen: "48 MIN · 5v5",
        bodySpecimen:
          "Scores, timers, and stat lines render in tabular mono for clean alignment.",
      },
    ],
    assets: [
      {
        name: "GotNext Logo — Light",
        kind: AssetKind.LOGO,
        url: LOGO,
        mime: "image/svg+xml",
        theme: AssetTheme.LIGHT,
        sizes: "256,512,1024",
      },
      {
        name: "GotNext Logo — Dark",
        kind: AssetKind.LOGO,
        url: LOGO,
        mime: "image/svg+xml",
        theme: AssetTheme.DARK,
        sizes: "256,512,1024",
      },
      {
        name: "App Icon",
        kind: AssetKind.ICON,
        url: LOGO,
        mime: "image/svg+xml",
      },
      {
        name: "Launch Banner",
        kind: AssetKind.BANNER,
        url: LOGO,
        mime: "image/svg+xml",
      },
    ],
    docs: [
      {
        title: "Getting started",
        slug: "getting-started",
        category: "Handoff",
        contentMd:
          "# Getting started\n\nWelcome to the GotNext handoff. This portal is your single source of truth for the brand and build.\n\n## What's here\n\n- **Brand** — colors, type, and logo files\n- **Assets** — download-ready icons and banners\n- **Docs** — everything you need to run the project yourself\n- **Updates** — a running log of progress\n\n## Running the app locally\n\n```bash\nbun install\nbun run dev\n```\n\nOpen `http://localhost:3000` and you're off.",
      },
      {
        title: "Deployment",
        slug: "deployment",
        category: "Handoff",
        contentMd:
          "# Deployment\n\nThe app deploys to Vercel on every push to `main`.\n\n1. Connect the repo in the Vercel dashboard\n2. Add the environment variables from `.env.example`\n3. Push to `main`\n\n> Rollbacks are one click from the Vercel **Deployments** tab.",
      },
    ],
    updates: [
      {
        title: "Brand system delivered",
        bodyMd:
          "Final logo lockups, color tokens, and type scale are live in the Brand section.",
        tag: "Design",
      },
      {
        title: "Homepage build underway",
        bodyMd: "Hero, marquee, and projects sections are in progress.",
        tag: "Build",
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
  for (const c of clients) {
    const passwordHash = await bcrypt.hash(c.password, 12);

    const client = await db.client.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        tagline: c.tagline,
        accentColor: c.accentColor,
        logoUrl: LOGO,
      },
      create: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        accentColor: c.accentColor,
        logoUrl: LOGO,
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

    console.log(`✓ ${c.name}  →  slug: ${c.slug}  password: ${c.password}`);
  }
  console.log(
    "\nSeed complete. Log in at /portal with the slug + password above.",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
