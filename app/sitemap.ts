import type { MetadataRoute } from "next";
import { getSitemapContent } from "@/lib/blog/data";
import { absoluteUrl } from "@/lib/site-url";

export const revalidate = 900;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, categories, authors } = await getSitemapContent();
  const now = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: posts[0]?.updatedAt ?? now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...posts
      .filter((post) => !post.noIndex && !post.canonicalURL)
      .map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/blog/category/${category.slug}`),
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...authors.map((author) => ({
      url: absoluteUrl(`/blog/author/${author.slug}`),
      lastModified: author.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
