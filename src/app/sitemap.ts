import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { routing, type Locale } from "@/i18n/routing";
import { getAllSkills } from "@/lib/d1";
import { getContentSlugs } from "@/lib/mdx";
import { SITE_URL, localizedPath } from "@/lib/seo";

// Get file modification time or fallback to a fixed date
function getFileMtime(filePath: string): Date {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime;
  } catch {
    // Fallback to a reasonable fixed date if file doesn't exist
    return new Date("2026-01-01");
  }
}

// Get the modification time for a docs file
function getDocsMtime(locale: Locale, slug: string): Date {
  const contentDir = path.join(process.cwd(), "src/content/docs");

  // Try locale-specific file first, then fallback to English
  const localeSuffix = locale === "zh" ? ".zh" : "";
  const mdxPath = path.join(contentDir, `${slug}${localeSuffix}.mdx`);
  const mdPath = path.join(contentDir, `${slug}${localeSuffix}.md`);
  const fallbackMdxPath = path.join(contentDir, `${slug}.mdx`);
  const fallbackMdPath = path.join(contentDir, `${slug}.md`);

  for (const p of [mdxPath, mdPath, fallbackMdxPath, fallbackMdPath]) {
    if (fs.existsSync(p)) {
      return getFileMtime(p);
    }
  }

  return new Date("2026-01-01");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use a weekly update date for main pages (rounded to start of week)
  const now = new Date();
  const weeklyDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());

  // Fixed date for skills data file modification
  const skillsDataPath = path.join(process.cwd(), "src/data/skills.ts");
  const skillsLastModified = getFileMtime(skillsDataPath);

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const typedLocale = locale as Locale;

    // Home page - use weekly date
    entries.push({
      url: new URL(localizedPath(typedLocale, "/"), SITE_URL).toString(),
      lastModified: weeklyDate,
      changeFrequency: "weekly",
      priority: 1,
    });

    // Skills list page - use skills data modification time
    entries.push({
      url: new URL(localizedPath(typedLocale, "/skills"), SITE_URL).toString(),
      lastModified: skillsLastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    // Docs pages - use actual file modification time
    const docSlugs = getContentSlugs(typedLocale, "docs");
    const normalizedDocSlugs = docSlugs.includes("introduction")
      ? docSlugs
      : ["introduction", ...docSlugs];

    for (const slug of normalizedDocSlugs) {
      entries.push({
        url: new URL(
          localizedPath(typedLocale, `/docs/${slug}`),
          SITE_URL
        ).toString(),
        lastModified: getDocsMtime(typedLocale, slug),
        changeFrequency: "weekly",
        priority: slug === "introduction" ? 0.7 : 0.6,
      });
    }

    // Skills detail pages - use skills data modification time
    const allSkills = await getAllSkills();
    for (const skill of allSkills) {
      entries.push({
        url: new URL(
          localizedPath(typedLocale, `/skills/${skill.slug || skill.id}`),
          SITE_URL
        ).toString(),
        lastModified: skillsLastModified,
        changeFrequency: "weekly",
        priority: skill.featured ? 0.8 : 0.7,
      });
    }
  }

  return entries;
}
