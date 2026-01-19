import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://openagentskills.dev";
export const SITE_NAME = "Open Agent Skills";
export const OG_IMAGE_PATH = "/og.svg";
export const OG_IMAGE_ALT = "Open Agent Skills";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

const MAX_KEYWORDS_LENGTH = 100;
const MAX_TITLE_LENGTH = 60;

const BASE_KEYWORDS: Record<Locale, string[]> = {
  en: [
    "agent skills",
    "AI agents",
    "AI workflows",
    "skills directory",
    "Open Agent Skills",
    "AI tooling",
    "reusable skills",
    "agent capabilities",
    "LLM agents",
  ],
  zh: [
    "代理技能",
    "AI 代理",
    "AI 工作流",
    "技能目录",
    "Open Agent Skills",
    "AI 工具",
    "可复用技能",
    "智能体能力",
    "大模型代理",
  ],
};

const HOME_KEYWORDS: Record<Locale, string[]> = {
  en: ["discover agent skills", "share agent skills", "AI skill hub", "skill marketplace"],
  zh: ["发现代理技能", "分享代理技能", "AI 技能库", "技能市场"],
};

const SKILLS_KEYWORDS: Record<Locale, string[]> = {
  en: ["browse agent skills", "skills list", "skill catalog", "skill tags"],
  zh: ["浏览代理技能", "技能列表", "技能目录", "技能标签"],
};

const DOCS_KEYWORDS: Record<Locale, string[]> = {
  en: [
    "agent skills docs",
    "skill specification",
    "SKILL.md",
    "integration guide",
    "best practices",
  ],
  zh: ["代理技能文档", "技能规范", "SKILL.md", "集成指南", "最佳实践"],
};

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === routing.defaultLocale) {
    return normalized;
  }

  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function buildUrl(locale: Locale, path: string): URL {
  return new URL(localizedPath(locale, path), SITE_URL);
}

export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = buildUrl(supportedLocale, path).toString();
  }

  languages["x-default"] = buildUrl(routing.defaultLocale, path).toString();

  return {
    canonical: buildUrl(locale, path).toString(),
    languages,
  };
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "zh" ? "zh_CN" : "en_US";
}

export function getOpenGraphImages() {
  return [
    {
      url: new URL(OG_IMAGE_PATH, SITE_URL).toString(),
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: OG_IMAGE_ALT,
    },
  ];
}

function mergeKeywords(...lists: Array<string[] | undefined>): string[] {
  const merged: string[] = [];

  for (const list of lists) {
    if (!list) continue;
    for (const keyword of list) {
      const normalized = keyword?.trim();
      if (!normalized || merged.includes(normalized)) {
        continue;
      }
      merged.push(normalized);
    }
  }

  return merged;
}

function limitKeywordsLength(keywords: string[], maxLength = MAX_KEYWORDS_LENGTH): string[] {
  const trimmed: string[] = [];
  let currentLength = 0;

  for (const keyword of keywords) {
    const separatorLength = trimmed.length === 0 ? 0 : 2;
    const nextLength = currentLength + separatorLength + keyword.length;

    if (nextLength > maxLength) {
      break;
    }

    trimmed.push(keyword);
    currentLength = nextLength;
  }

  return trimmed;
}

export function formatTitle(title: string, maxLength = MAX_TITLE_LENGTH): string {
  if (title.length <= maxLength) {
    return title;
  }

  if (maxLength <= 3) {
    return title.slice(0, maxLength);
  }

  return `${title.slice(0, maxLength - 3)}...`;
}

export function getBaseKeywords(locale: Locale): string[] {
  return limitKeywordsLength(BASE_KEYWORDS[locale] ?? BASE_KEYWORDS.en);
}

export function getHomeKeywords(locale: Locale): string[] {
  return limitKeywordsLength(mergeKeywords(getBaseKeywords(locale), HOME_KEYWORDS[locale]));
}

export function getSkillsKeywords(locale: Locale): string[] {
  return limitKeywordsLength(mergeKeywords(getBaseKeywords(locale), SKILLS_KEYWORDS[locale]));
}

export function getDocsKeywords(locale: Locale, pageTitle?: string): string[] {
  return limitKeywordsLength(
    mergeKeywords(getBaseKeywords(locale), DOCS_KEYWORDS[locale], pageTitle ? [pageTitle] : undefined)
  );
}

export function getSkillKeywords(
  locale: Locale,
  data: {
    name: string;
    tags?: string[];
    category?: string;
    categoryZh?: string;
  }
): string[] {
  const localizedCategory = locale === "zh" ? data.categoryZh : data.category;
  const localizedSkillLabel = locale === "zh" ? "代理技能" : "agent skill";

  return limitKeywordsLength(
    mergeKeywords(
      getBaseKeywords(locale),
      [data.name, localizedCategory, localizedSkillLabel].filter(Boolean) as string[],
      data.tags
    )
  );
}
