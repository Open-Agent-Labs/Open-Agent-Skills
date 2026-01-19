import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { skills } from "@/data/skills";
import { getContentSlugs } from "@/lib/mdx";
import { SITE_URL, localizedPath } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const typedLocale = locale as Locale;
    const basePaths = ["/", "/skills", "/docs"];

    for (const path of basePaths) {
      entries.push({
        url: new URL(localizedPath(typedLocale, path), SITE_URL).toString(),
        lastModified: now,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.7,
      });
    }

    const docSlugs = getContentSlugs(typedLocale, "docs");
    for (const slug of docSlugs) {
      entries.push({
        url: new URL(
          localizedPath(typedLocale, `/docs/${slug}`),
          SITE_URL
        ).toString(),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }

    for (const skill of skills) {
      entries.push({
        url: new URL(
          localizedPath(typedLocale, `/skills/${skill.id}`),
          SITE_URL
        ).toString(),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
