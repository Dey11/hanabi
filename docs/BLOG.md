# Hanabi blog and Payload CMS

Payload manages the public blog at `/cms`. It is separate from Hanabi's existing `/admin` client-management area.

## First-time setup

1. Set `NEXT_PUBLIC_SITE_URL`, `PAYLOAD_SECRET`, `PAYLOAD_PREVIEW_SECRET`, and `PAYLOAD_CRON_SECRET` in the target environment. See `.env.example`.
2. Point `PAYLOAD_DATABASE_URL` at the CMS database, or leave it empty to use `DATABASE_URL`. Payload owns only the `payload` Postgres schema; Prisma continues to own the existing `public` schema.
3. Apply the checked-in Payload migrations before building or starting the application:

   ```bash
   bun run payload:migrate
   ```

4. Start Hanabi and open `/cms`. Payload will present its create-first-user screen when no CMS users exist.

Do not set `PAYLOAD_DB_PUSH=true` against a shared or production database. That switch is only for rapid work against a disposable local database.

## Publishing an article

Create content in this order:

1. Upload media with useful alt text. The hero image should work at 16:9 and at 1200×630 for social sharing.
2. Create an author profile with a public bio.
3. Create one or more categories with clear descriptions.
4. Create the post, write its direct summary in `excerpt`, and fill the SEO fields.
5. Add sources for factual claims and FAQs only when they are genuinely answered by the article.
6. Use Preview to inspect the draft, then publish or schedule it.

Only records with `_status=published` and a `publishedAt` time in the past are exposed publicly. Saving or deleting a post revalidates blog, feed, and sitemap paths.

Scheduled publishing also needs a job runner. On a long-running host, run:

```bash
bun run payload:jobs
```

On a serverless host, call `/cms-api/payload-jobs/run?queue=default` at least once per minute with `Authorization: Bearer $PAYLOAD_CRON_SECRET`. The endpoint is denied when the secret is absent or invalid.

## Public routes

- `/blog`: archive and featured article
- `/blog/[slug]`: article page
- `/blog/category/[slug]`: topic archive
- `/blog/author/[slug]`: author archive
- `/blog/feed.xml`: RSS feed
- `/sitemap.xml`: public URLs from Payload
- `/robots.txt`: crawler rules, with portal and CMS paths blocked

Article pages emit `BlogPosting`, `BreadcrumbList`, and optional `FAQPage` JSON-LD. They also expose canonical, Open Graph, Twitter, author, publication, and modification metadata.

## Media storage

Local development falls back to the ignored `media/` directory. Production should set all five variables below to enable the Cloudflare R2 adapter:

- `PAYLOAD_R2_BUCKET`
- `PAYLOAD_R2_ACCESS_KEY_ID`
- `PAYLOAD_R2_SECRET_ACCESS_KEY`
- `PAYLOAD_R2_ENDPOINT`
- `PAYLOAD_MEDIA_BASE_URL`

These credentials are deliberately distinct from the client portal's `R2_*` variables. Blog objects use the `blog/` prefix.

Payload uploads directly from the browser when R2 is enabled. The bucket CORS policy must allow `PUT` requests from `NEXT_PUBLIC_SITE_URL` and allow the `Content-Type` and `If-None-Match` request headers.

Use this policy as the starting point, replacing the example origin with the exact production origin:

```json
[
  {
    "AllowedOrigins": ["https://example.com"],
    "AllowedMethods": ["GET", "HEAD", "PUT"],
    "AllowedHeaders": ["Content-Type", "If-None-Match"],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## Schema changes

After changing a Payload collection or field:

```bash
bun run payload:generate-types
bun run payload:generate-importmap
bun run payload:migrate:create descriptive_name
bunx tsc --noEmit
bun run build
```

Generate migrations against a development database and review the SQL before applying them elsewhere. Commit the generated migration, `payload-types.ts`, and admin import map together with the config change.
