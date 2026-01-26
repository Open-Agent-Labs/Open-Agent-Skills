import { setRequestLocale } from "next-intl/server";
import type { Category } from "@/data/skills";
import { SkillsPageClient } from "@/components/SkillsPageClient";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";
import { getSkills } from "@/lib/d1";

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
  const initialCategory = categoryParam && VALID_CATEGORIES.includes(categoryParam as Category | "all" | "featured")
    ? (categoryParam as Category | "all" | "featured")
    : "all";
  const skills = await getSkills();
  const title = locale === "zh" ? "发现 Agent Skills" : "Discover Agent Skills";
  const subtitle =
    locale === "zh"
      ? `浏览 ${skills.length}+ 个技能，增强你的 AI Agent 能力`
      : `Browse ${skills.length}+ skills to enhance your AI agent`;
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
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsListJsonLd) }}
      />
      <SiteHeader current="skills" />
      <SkillsPageClient
        initialSkills={skills}
        locale={locale}
        initialCategory={initialCategory}
        title={title}
        subtitle={subtitle}
      />

      <Footer />
    </div>
  );
}
