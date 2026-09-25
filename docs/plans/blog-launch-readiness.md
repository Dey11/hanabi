# Blog launch readiness

## Goal

Make the Payload blog buildable, keep its media durable in Cloudflare R2, make public URLs and search metadata consistent, and release a small reviewed set of articles without exposing unfinished drafts.

## Scope and decisions

- Keep the existing Payload and Prisma schema split. Do not recreate the 500 imported drafts.
- Use the existing `hanabi-marketing-assets` R2 bucket under the dedicated `blog/` prefix. Reconcile the imported media records only after verifying each referenced object is present with the expected byte count.
- Use `https://www.tryhanabi.com` as the public canonical host because production redirects the apex there.
- Keep unpublished posts out of the sitemap and public archive. Include category and author archives only when they have published posts.
- Review a small connected first batch before publishing: drafts 2, 9, 10, and 49 link only within those four. The other drafts remain unpublished.
- Search Console submission belongs to the site owner after the live sitemap is verified.

## Validation

1. Typecheck and production build pass on the branch and in the PR deployment.
2. Every production media record resolves to an R2 object with the recorded byte count. Verify representative public image URLs.
3. Verify `/blog`, representative articles, `/robots.txt`, `/sitemap.xml`, and `/blog/feed.xml` on the production host.
4. Check metadata, canonicals, structured data, and broken links on desktop and mobile.
5. Confirm the sitemap lists only canonical, indexable public URLs and returns valid XML.

## Risks and status

- The production database has 500 drafts and 1,500 media records. On September 25, the 6,239 referenced local files were uploaded under R2 `blog/`, verified by byte count and SHA-256, and all 1,500 media URLs were reconciled. The local source directory remains untouched.
- PR #19 failed a Vercel TypeScript check at audit time. The importer type errors are fixed locally; the PR deployment must still pass before release.
- Publishing or merging to production is a separate release decision; do not infer it from a passing local build.
- Search indexing and field Core Web Vitals cannot be verified from code alone. The owner will submit the live sitemap to Search Console.

Status: media repaired and local production build passing; PR deployment, production release, and first publication pending.
