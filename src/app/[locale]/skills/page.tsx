import { setRequestLocale } from "next-intl/server";
import type { Category } from "@/data/skills";
import { SkillsPageClient } from "@/components/SkillsPageClient";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";
import { getSkills, getSkillsCount } from "@/lib/d1";

const VALID_CATEGORIES: (Category | "all" | "featured")[] = [
  "all",
  "featured",
  "document-processing",
  "development",
  "data-analysis",
  "business-marketing",
  "communication",
  "creative-media",
  "productivity",
  "collaboration",
  "security",
];

type SearchParams = Record<string, string | string[] | undefined>;

function getFirstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function toPositiveInt(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export default async function SkillsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<SearchParams> | SearchParams;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : undefined;
  const categoryParam = resolvedSearchParams ? getFirstParam(resolvedSearchParams.category) : undefined;
  const pageParam = resolvedSearchParams ? getFirstParam(resolvedSearchParams.page) : undefined;
  const page = toPositiveInt(pageParam, 1);
  const pageSize = 24;
  const initialCategory = categoryParam && VALID_CATEGORIES.includes(categoryParam as Category | "all" | "featured")
    ? (categoryParam as Category | "all" | "featured")
    : "all";
  const baseParams = initialCategory === "featured"
    ? { featured: true }
    : initialCategory === "all"
      ? {}
      : { category: initialCategory as Category };
  const totalCount = await getSkillsCount(baseParams);
  const skills = await getSkills({
    ...baseParams,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
  const title = locale === "zh" ? "发现 Agent Skills" : "Discover Agent Skills";
  const subtitle =
    locale === "zh"
      ? `浏览 ${totalCount}+ 个技能，增强你的 AI Agent 能力`
      : `Browse ${totalCount}+ skills to enhance your AI agent`;
  // ItemList structured data for SEO
  const skillsListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description: subtitle,
    numberOfItems: skills.length,
    itemListElement: skills.slice(0, 50).map((skill, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: skill.name,
        description: locale === "zh" ? skill.descriptionZh || skill.description : skill.description,
        url: `${SITE_URL}${locale === "zh" ? "/zh" : ""}/skills/${skill.id}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsListJsonLd) }}
      />
      <SiteHeader current="skills" />
      <SkillsPageClient
        initialSkills={skills}
        locale={locale}
        initialCategory={initialCategory}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        title={title}
        subtitle={subtitle}
      />

      <Footer />
    </div>
  );
}
