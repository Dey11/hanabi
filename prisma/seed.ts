/**
 * Seeds the portal with a few sample clients so the UI is explorable
 * before real data is entered through the admin.
 *
 *   bun run prisma/seed.ts   (or: bunx prisma db seed)
 *
 * Each client's portal password is printed at the end — note them down.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../lib/db";
import { AssetKind, UpdateSource } from "../lib/generated/prisma/enums";

type SeedClient = {
  slug: string;
  name: string;
  tagline: string;
  accentColor: string;
  password: string;
  colors: { name: string; value: string; role?: string }[];
  fonts: {
    name: string;
    category: string;
    weights: string;
    specimen?: string;
  }[];
  docs: { title: string; slug: string; category: string; contentMd: string }[];
  updates: { title: string; bodyMd: string; tag: string }[];
};

const clients: SeedClient[] = [
  {
    slug: "gotnext",
    name: "GotNext",
    tagline: "Pickup basketball, organized.",
    accentColor: "oklch(0.62 0.19 40)",
    password: "gotnext-2026",
    colors: [
      { name: "Court Orange", value: "#F0562E", role: "Primary / CTAs" },
      { name: "Ink", value: "#141414", role: "Text" },
      { name: "Paper", value: "#FAFAFA", role: "Backgrounds" },
      { name: "Line", value: "#E7E7E7", role: "Borders" },
    ],
    fonts: [
      {
        name: "Geist",
        category: "Sans / Body",
        weights: "400, 500, 600",
        specimen: "Run the play.",
      },
      { name: "Geist Mono", category: "Mono / Labels", weights: "400, 500" },
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
    accentColor: "oklch(0.55 0.16 265)",
    password: "aurora-2026",
    colors: [
      { name: "Aurora", value: "#5B6CFF", role: "Primary" },
      { name: "Deep", value: "#0B1020", role: "Text / dark surfaces" },
      { name: "Mist", value: "#F4F6FB", role: "Backgrounds" },
    ],
    fonts: [
      { name: "Inter", category: "Sans / Body", weights: "400, 500, 700" },
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
    accentColor: "oklch(0.75 0.15 85)",
    password: "marigold-2026",
    colors: [
      { name: "Marigold", value: "#E8B23A", role: "Primary" },
      { name: "Clay", value: "#3A2E23", role: "Text" },
      { name: "Cream", value: "#FBF7EE", role: "Backgrounds" },
    ],
    fonts: [{ name: "Geist", category: "Sans / Body", weights: "400, 500" }],
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
    await db.client.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        name: c.name,
        tagline: c.tagline,
        accentColor: c.accentColor,
        passwordHash,
        colors: {
          create: c.colors.map((color, i) => ({ ...color, order: i })),
        },
        fonts: {
          create: c.fonts.map((font, i) => ({ ...font, order: i })),
        },
        assets: {
          create: [
            {
              name: `${c.name} Logo (SVG)`,
              kind: AssetKind.LOGO,
              url: "https://example.com/placeholder-logo.svg",
              mime: "image/svg+xml",
              order: 0,
            },
          ],
        },
        docs: {
          create: c.docs.map((doc, i) => ({ ...doc, order: i })),
        },
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
