import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    // `bun run` executes the TS seed directly.
    seed: "bun run prisma/seed.ts",
  },
  datasource: {
    // Migrations run over a DIRECT (non-pooled) Neon connection.
    // The app runtime uses the pooled DATABASE_URL via the Neon adapter (see lib/db.ts).
    url: env("DIRECT_URL"),
  },
});
