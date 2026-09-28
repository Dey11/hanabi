# Blog library review and conversion

## Goal and scope

Use the existing 500 unpublished Hanabi articles, rather than generating a duplicate library. Check the source drafts against their assignments and give article readers a clear way to see Hanabi's services or ask for help.

## Decisions

- Keep Payload as the CMS. The 500 draft records and their media already exist; this change does not import, publish, or mutate them.
- Add an offline validation command for draft count, metadata, length bands, FAQs, calls to action, and internal article links. Human review still determines whether each article is useful and factually sound.
- Add one article-page help section with links to the on-site services section and existing intro-call flow. It works for published articles and draft previews without modifying stored rich text.
- Keep the first-100 release procedure and later editorial cadence described in `docs/BLOG.md` and `docs/seo-geo.md`.

## Validation and risks

Run `bun run blog:validate`, `bunx tsc --noEmit`, and `bun run build`. Check the article help section at mobile and desktop widths once a preview with published content is available.

An automated draft check cannot establish originality, source accuracy, or practical usefulness. Google warns that large amounts of unoriginal, low-value content made chiefly for search can be treated as [scaled content abuse](https://developers.google.com/search/docs/essentials/spam-policies). Keep the library in draft until articles are reviewed and linked to live siblings.

Status: complete in the local branch. The 500-draft validation and TypeScript check pass. The production build passes against an isolated local Postgres database with the checked-in Payload migration. PR review and any future publication remain separate.
