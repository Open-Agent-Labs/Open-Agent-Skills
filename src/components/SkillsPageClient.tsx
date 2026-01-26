"use client";

import { useMemo, useState } from "react";
import { SkillCard } from "@/components/SkillCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchInput } from "@/components/SearchInput";
import type { Category, Skill } from "@/data/skills";

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

interface SkillsPageClientProps {
  initialSkills: Skill[];
  locale: string;
  initialCategory: Category | "all" | "featured";
  title: string;
  subtitle: string;
}

export function SkillsPageClient({
  initialSkills,
  locale,
  initialCategory,
  title,
  subtitle,
}: SkillsPageClientProps) {
  const safeInitialCategory = VALID_CATEGORIES.includes(initialCategory) ? initialCategory : "all";
  const [activeCategory, setActiveCategory] = useState<Category | "all" | "featured">(safeInitialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    let result = initialSkills;

    if (activeCategory === "featured") {
      result = initialSkills.filter((s) => s.featured);
    } else if (activeCategory !== "all") {
      result = initialSkills.filter((s) => s.category === activeCategory);
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

    return result;
  }, [activeCategory, initialSkills, locale, searchQuery]);

  const searchPlaceholder = locale === "zh" ? "搜索 skills..." : "Search skills...";
  const noResultsText = locale === "zh" ? "没有找到匹配的 skills" : "No skills found matching your criteria";
  const clearFiltersText = locale === "zh" ? "清除筛选" : "Clear filters";

  return (
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

        {filteredSkills.length > 0 ? (
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
  );
}
