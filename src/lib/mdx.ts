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
  group?: string;
}

export interface ContentItem extends ContentMeta {
  content: string;
}

export interface DocsGroup {
  id: string;
  label: string;
  docs: ContentMeta[];
}

export function getContentDirectory(type: "docs" | "blog") {
  return path.join(contentDirectory, type);
}

export function getContentSlugs(locale: Locale, type: "docs" | "blog") {
  const dir = getContentDirectory(type);

  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  
  if (locale === "zh") {
    return files
      .filter((file) => /\.zh\.mdx?$/.test(file))
      .map((file) => file.replace(/\.zh\.mdx?$/, ""));
  } else {
    return files
      .filter((file) => /\.mdx?$/.test(file) && !/\.zh\.mdx?$/.test(file))
      .map((file) => file.replace(/\.mdx?$/, ""));
  }
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
  const dir = getContentDirectory(type);
  
  let filePath = "";
  
  if (locale === "zh") {
    const zhMdxPath = path.join(dir, `${slug}.zh.mdx`);
    const zhMdPath = path.join(dir, `${slug}.zh.md`);
    
    if (fs.existsSync(zhMdxPath)) {
      filePath = zhMdxPath;
    } else if (fs.existsSync(zhMdPath)) {
      filePath = zhMdPath;
    } else {
      const enMdxPath = path.join(dir, `${slug}.mdx`);
      const enMdPath = path.join(dir, `${slug}.md`);
      
      if (fs.existsSync(enMdxPath)) {
        filePath = enMdxPath;
      } else if (fs.existsSync(enMdPath)) {
        filePath = enMdPath;
      }
    }
  } else {
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
    group: meta.group,
    content,
  };
}

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
        group: content.group,
      });
    }
  }

  return docs.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });
}

const GROUP_ORDER = ["getting-started", "creating-skills", "integration", "reference"];

const GROUP_LABELS: Record<string, { en: string; zh: string }> = {
  "getting-started": { en: "Getting Started", zh: "入门" },
  "creating-skills": { en: "Creating Skills", zh: "创建 Skill" },
  "integration": { en: "Integration", zh: "集成使用" },
  "reference": { en: "Reference", zh: "参考" },
};

export async function getDocsGrouped(locale: Locale): Promise<DocsGroup[]> {
  const docs = await getAllDocsMetadata(locale);
  const groups: Map<string, ContentMeta[]> = new Map();

  for (const doc of docs) {
    const groupId = doc.group || "other";
    if (!groups.has(groupId)) {
      groups.set(groupId, []);
    }
    groups.get(groupId)!.push(doc);
  }

  const result: DocsGroup[] = [];
  
  for (const groupId of GROUP_ORDER) {
    const groupDocs = groups.get(groupId);
    if (groupDocs && groupDocs.length > 0) {
      result.push({
        id: groupId,
        label: GROUP_LABELS[groupId]?.[locale] || groupId,
        docs: groupDocs.sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          if (a.order !== undefined) return -1;
          if (b.order !== undefined) return 1;
          return a.slug.localeCompare(b.slug);
        }),
      });
    }
  }

  const otherDocs = groups.get("other");
  if (otherDocs && otherDocs.length > 0) {
    result.push({
      id: "other",
      label: locale === "zh" ? "其他" : "Other",
      docs: otherDocs,
    });
  }

  return result;
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
