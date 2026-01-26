"use client";

import { useMemo, useState } from "react";
import { SkillCard } from "@/components/SkillCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchInput } from "@/components/SearchInput";
import { Link } from "@/i18n/navigation";
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
  page: number;
  pageSize: number;
  totalCount: number;
  title: string;
  subtitle: string;
}

export function SkillsPageClient({
  initialSkills,
  locale,
  initialCategory,
  page,
  pageSize,
  totalCount,
  title,
  subtitle,
}: SkillsPageClientProps) {
  const safeInitialCategory = VALID_CATEGORIES.includes(initialCategory) ? initialCategory : "all";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    let result = initialSkills;
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
    return result;
  }, [initialSkills, locale, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const clampedPage = Math.min(Math.max(page, 1), totalPages);
  const hasPrev = clampedPage > 1;
  const hasNext = clampedPage < totalPages;

  const buildPageHref = (targetPage: number) => {
    const params = new URLSearchParams();
    if (safeInitialCategory !== "all") {
      params.set("category", safeInitialCategory);
    }
    if (targetPage > 1) {
      params.set("page", targetPage.toString());
    }
    const query = params.toString();
    return query ? `/skills?${query}` : "/skills";
  };

  const buildCategoryHref = (category: Category | "all" | "featured") => {
    const params = new URLSearchParams();
    if (category !== "all") {
      params.set("category", category);
    }
    const query = params.toString();
    return query ? `/skills?${query}` : "/skills";
  };

  const searchPlaceholder = locale === "zh" ? "搜索 skills..." : "Search skills...";
  const noResultsText = locale === "zh" ? "没有找到匹配的 skills" : "No skills found matching your criteria";
  const clearFiltersText = locale === "zh" ? "清除筛选" : "Clear filters";
  const pageLabel = locale === "zh" ? "页" : "Page";
  const prevLabel = locale === "zh" ? "上一页" : "Previous";
  const nextLabel = locale === "zh" ? "下一页" : "Next";

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
            activeCategory={safeInitialCategory}
            buildHref={buildCategoryHref}
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
              }}
              className="px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              {clearFiltersText}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-10">
          <Link
            href={buildPageHref(clampedPage - 1)}
            aria-disabled={!hasPrev}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              hasPrev
                ? "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                : "border-zinc-200 text-zinc-400 cursor-not-allowed dark:border-zinc-800 dark:text-zinc-600"
            }`}
          >
            {prevLabel}
          </Link>
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {pageLabel} {clampedPage} / {totalPages}
          </span>
          <Link
            href={buildPageHref(clampedPage + 1)}
            aria-disabled={!hasNext}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-colors ${
              hasNext
                ? "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                : "border-zinc-200 text-zinc-400 cursor-not-allowed dark:border-zinc-800 dark:text-zinc-600"
            }`}
          >
            {nextLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
