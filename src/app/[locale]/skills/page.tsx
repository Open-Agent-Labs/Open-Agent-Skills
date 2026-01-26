"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import type { Category, Skill } from "@/data/skills";
import { SkillCard } from "@/components/SkillCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchInput } from "@/components/SearchInput";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/seo";

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

export default function SkillsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || "en";

  const [activeCategory, setActiveCategory] = useState<Category | "all" | "featured">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch skills from API
  useEffect(() => {
    async function fetchSkills() {
      setLoading(true);
      try {
        const response = await fetch("/api/skills");
        if (response.ok) {
          const data = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSkills();
  }, []);

  // Read category from URL on mount and when searchParams change
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl && VALID_CATEGORIES.includes(categoryFromUrl as Category)) {
      setActiveCategory(categoryFromUrl as Category);
    }
  }, [searchParams]);

  // Filter skills based on category and search query
  useEffect(() => {
    let result = skills;

    if (activeCategory === "featured") {
      result = skills.filter((s) => s.featured);
    } else if (activeCategory !== "all") {
      result = skills.filter((s) => s.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter((s) => {
        const description = locale === "zh" ? s.descriptionZh || s.description : s.description;
        return (
          s.name.toLowerCase().includes(query) ||
          description.toLowerCase().includes(query) ||
          s.tags?.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    setFilteredSkills(result);
  }, [skills, activeCategory, searchQuery, locale]);

  const title = locale === "zh" ? "发现 Agent Skills" : "Discover Agent Skills";
  const subtitle =
    locale === "zh"
      ? `浏览 ${skills.length}+ 个技能，增强你的 AI Agent 能力`
      : `Browse ${skills.length}+ skills to enhance your AI agent`;
  const searchPlaceholder = locale === "zh" ? "搜索 skills..." : "Search skills...";
  const noResultsText = locale === "zh" ? "没有找到匹配的 skills" : "No skills found matching your criteria";
  const clearFiltersText = locale === "zh" ? "清除筛选" : "Clear filters";

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

      <main className="pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
              {title}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          </div>

          <div className="mb-8">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={searchPlaceholder}
            />
          </div>

          <div className="mb-8 overflow-x-auto pb-2">
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              locale={locale}
            />
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⏳</div>
              <p className="text-zinc-600 dark:text-zinc-400">
                {locale === "zh" ? "加载中..." : "Loading..."}
              </p>
            </div>
          ) : filteredSkills.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSkills.map((skill) => (
                <SkillCard key={skill.id} skill={skill} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {noResultsText}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                {clearFiltersText}
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
