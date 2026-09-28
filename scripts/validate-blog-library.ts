import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = path.join(root, "content");
const draftsDirectory = path.join(content, "blog-drafts");
const problems: string[] = [];

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readJson(file: string): unknown {
  return JSON.parse(readFileSync(file, "utf8")) as unknown;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

const plans = ["blog-plan.json", "blog-plan-500.json"].flatMap((file) => {
  const value = readJson(path.join(content, file));
  if (!Array.isArray(value)) throw new Error(`${file} must be an array`);
  return value;
});
const allPlannedSlugs = new Set(
  plans.map((item) => text(record(item)?.slug)).filter(Boolean),
);
const plannedSlugs = new Set<string>();
const plannedNumbers = new Set<number>();

for (const rawPlan of plans) {
  const plan = record(rawPlan);
  if (!plan || typeof plan.n !== "number" || !text(plan.slug)) {
    problems.push("A plan entry lacks a number or slug");
    continue;
  }
  const number = plan.n;
  const slug = text(plan.slug);
  if (plannedNumbers.has(number))
    problems.push(`Duplicate plan number ${number}`);
  if (plannedSlugs.has(slug)) problems.push(`Duplicate plan slug ${slug}`);
  plannedNumbers.add(number);
  plannedSlugs.add(slug);

  const file = path.join(
    draftsDirectory,
    `${String(number).padStart(3, "0")}.json`,
  );
  let draft: Record<string, unknown> | null;
  try {
    draft = record(readJson(file));
  } catch {
    problems.push(`${number}: missing or invalid draft file`);
    continue;
  }
  if (!draft) {
    problems.push(`${number}: draft must be an object`);
    continue;
  }

  const prefix = `${number} ${slug}`;
  const markdown = text(draft.markdown);
  const title = text(draft.title);
  const metaTitle = text(draft.metaTitle);
  const excerpt = text(draft.excerpt);
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  const minimumWords = number > 100 ? 1500 : 900;
  const headings = (markdown.match(/^## /gm) ?? []).length;

  if (draft.n !== number || text(draft.slug) !== slug)
    problems.push(`${prefix}: number or slug differs from plan`);
  if (text(draft.category) !== text(plan.category))
    problems.push(`${prefix}: category differs from plan`);
  if (text(draft.primaryKeyword) !== text(plan.keyword))
    problems.push(`${prefix}: keyword differs from plan`);
  if (!title || title.length > 90)
    problems.push(`${prefix}: title must be 1–90 characters`);
  if (!metaTitle || metaTitle.length > 60)
    problems.push(`${prefix}: meta title must be 1–60 characters`);
  if (excerpt.length < 80 || excerpt.length > 220)
    problems.push(`${prefix}: excerpt must be 80–220 characters`);
  if (wordCount < minimumWords || wordCount > 1900)
    problems.push(`${prefix}: ${wordCount} words outside ${minimumWords}–1900`);
  if (number > 100 && headings < 6)
    problems.push(`${prefix}: inbound draft needs at least six H2 sections`);
  if (!text(draft.alt) || !text(draft.caption))
    problems.push(`${prefix}: missing image alt text or caption`);

  const faqs = draft.faqs;
  if (
    !Array.isArray(faqs) ||
    faqs.length !== 3 ||
    faqs.some((item) => {
      const faq = record(item);
      return !faq || !text(faq.question) || !text(faq.answer);
    })
  ) {
    problems.push(`${prefix}: needs three answered FAQs`);
  }
  const sources = draft.sources;
  if (
    !Array.isArray(sources) ||
    sources.some((item) => {
      const source = record(item);
      return (
        !source ||
        !text(source.title) ||
        !text(source.url).startsWith("https://")
      );
    })
  ) {
    problems.push(`${prefix}: sources need titles and HTTPS URLs`);
  }

  const cta = text(plan.cta);
  const ctaUrls = new Set([
    cta,
    cta.replace("https://tryhanabi.com/", "https://www.tryhanabi.com/"),
  ]);
  const ctaCount = [...ctaUrls].reduce(
    (count, url) => count + markdown.split(url).length - 1,
    0,
  );
  if (!cta || ctaCount !== 1)
    problems.push(
      `${prefix}: expected one planned Hanabi link, found ${ctaCount}`,
    );

  const sibling = text(plan.sibling);
  const siblingPath = `/blog/${sibling}`;
  if (!allPlannedSlugs.has(sibling))
    problems.push(`${prefix}: sibling ${sibling} is absent from plan`);
  if (!sibling || markdown.split(siblingPath).length - 1 !== 1)
    problems.push(`${prefix}: expected one sibling link`);
  for (const match of markdown.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)) {
    if (!allPlannedSlugs.has(match[1]))
      problems.push(`${prefix}: broken article link /blog/${match[1]}`);
  }
}

const draftFiles = readdirSync(draftsDirectory).filter((name) =>
  name.endsWith(".json"),
);
if (plans.length !== 500 || draftFiles.length !== 500)
  problems.push(
    `Expected 500 plan entries and 500 drafts; found ${plans.length} and ${draftFiles.length}`,
  );
for (const file of draftFiles) {
  if (!plannedNumbers.has(Number(file.slice(0, -5))))
    problems.push(`Unplanned draft file ${file}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Validated 500 draft articles against the editorial plans.");
}
