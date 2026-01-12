import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ContentMeta {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  order?: number;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

/**
 * Get content directory path
 * New structure: src/content/docs/ (with .zh.mdx for Chinese)
 */
export function getContentDirectory(type: "docs" | "blog") {
  return path.join(contentDirectory, type);
}

/**
 * Get all content slugs for a given type and locale
 * - English: file.mdx
 * - Chinese: file.zh.mdx
 */
export function getContentSlugs(locale: Locale, type: "docs" | "blog") {
  const dir = getContentDirectory(type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  
  if (locale === "zh") {
    // For Chinese, look for .zh.mdx files
    return files
      .filter((file) => /\.zh\.mdx?$/.test(file))
      .map((file) => file.replace(/\.zh\.mdx?$/, ""));
  } else {
    // For English, look for files without .zh suffix
    return files
      .filter((file) => /\.mdx?$/.test(file) && !/\.zh\.mdx?$/.test(file))
      .map((file) => file.replace(/\.mdx?$/, ""));
  }
}

/**
 * Get all content paths for static generation
 */
export function getAllContentPaths(type: "docs" | "blog") {
  const locales: Locale[] = ["en", "zh"];
  const paths: { locale: Locale; slug: string }[] = [];

  for (const locale of locales) {
    const slugs = getContentSlugs(locale, type);
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }

  return paths;
}

/**
 * Get content by slug and locale
 * - English: looks for {slug}.mdx or {slug}.md
 * - Chinese: looks for {slug}.zh.mdx or {slug}.zh.md
 */
export async function getContentBySlug(
  locale: Locale,
  type: "docs" | "blog",
  slug: string
): Promise<ContentItem | null> {
  const dir = getContentDirectory(type);
  
  let filePath = "";
  
  if (locale === "zh") {
    // Chinese: look for .zh.mdx or .zh.md
    const zhMdxPath = path.join(dir, `${slug}.zh.mdx`);
    const zhMdPath = path.join(dir, `${slug}.zh.md`);
    
    if (fs.existsSync(zhMdxPath)) {
      filePath = zhMdxPath;
    } else if (fs.existsSync(zhMdPath)) {
      filePath = zhMdPath;
    } else {
      // Fallback to English version if Chinese doesn't exist
      const enMdxPath = path.join(dir, `${slug}.mdx`);
      const enMdPath = path.join(dir, `${slug}.md`);
      
      if (fs.existsSync(enMdxPath)) {
        filePath = enMdxPath;
      } else if (fs.existsSync(enMdPath)) {
        filePath = enMdPath;
      }
    }
  } else {
    // English: look for .mdx or .md (without .zh)
    const mdxPath = path.join(dir, `${slug}.mdx`);
    const mdPath = path.join(dir, `${slug}.md`);
    
    if (fs.existsSync(mdxPath)) {
      filePath = mdxPath;
    } else if (fs.existsSync(mdPath)) {
      filePath = mdPath;
    }
  }
  
  if (!filePath) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, meta } = parseFrontmatter(fileContent);

  return {
    slug,
    title: meta.title || slug,
    description: meta.description,
    date: meta.date,
    order: meta.order ? parseInt(meta.order, 10) : undefined,
    content,
  };
}

/**
 * Get all docs with metadata for sidebar/navigation
 */
export async function getAllDocsMetadata(locale: Locale): Promise<ContentMeta[]> {
  const slugs = getContentSlugs(locale, "docs");
  const docs: ContentMeta[] = [];

  for (const slug of slugs) {
    const content = await getContentBySlug(locale, "docs", slug);
    if (content) {
      docs.push({
        slug: content.slug,
        title: content.title,
        description: content.description,
        order: content.order,
      });
    }
  }

  // Sort by order if available, otherwise by slug
  return docs.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

function parseFrontmatter(content: string): {
  content: string;
  meta: Record<string, string>;
} {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { content, meta: {} };
  }

  const frontmatter = match[1];
  const meta: Record<string, string> = {};

  frontmatter.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      meta[key.trim()] = valueParts.join(":").trim().replace(/^["']|["']$/g, "");
    }
  });

  return {
    content: content.replace(frontmatterRegex, ""),
    meta,
  };
}
