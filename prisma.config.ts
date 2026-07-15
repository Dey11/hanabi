import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // `bun run` executes the TS seed directly.
    seed: "bun run prisma/seed.ts",
  },
  datasource: {
    // Migrations run over a DIRECT (non-pooled) Neon connection.
    // Read straight from process.env (not Prisma's `env()` helper) so that
    // `prisma generate` — which needs no DB — doesn't throw when DIRECT_URL is
    // absent, e.g. during `bun install` on Vercel. The app runtime uses the
    // pooled DATABASE_URL via the Neon adapter (see lib/db.ts).
    url: process.env.DIRECT_URL,
  },
});
