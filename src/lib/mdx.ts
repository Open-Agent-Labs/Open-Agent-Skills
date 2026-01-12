import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/routing";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ContentMeta {
  slug: string;
  title: string;
  description?: string;
  date?: string;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

export function getContentDirectory(locale: Locale, type: "docs" | "blog") {
  return path.join(contentDirectory, locale, type);
}

export function getContentSlugs(locale: Locale, type: "docs" | "blog") {
  const dir = getContentDirectory(locale, type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

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

export async function getContentBySlug(
  locale: Locale,
  type: "docs" | "blog",
  slug: string
): Promise<ContentItem | null> {
  const dir = getContentDirectory(locale, type);
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const mdPath = path.join(dir, `${slug}.md`);

  let filePath = "";
  if (fs.existsSync(mdxPath)) {
    filePath = mdxPath;
  } else if (fs.existsSync(mdPath)) {
    filePath = mdPath;
  } else {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { content, meta } = parseFrontmatter(fileContent);

  return {
    slug,
    title: meta.title || slug,
    description: meta.description,
    date: meta.date,
    content,
  };
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
