"use client";

import { useState, useMemo } from "react";
import { Link } from "@/i18n/navigation";
import { useParams } from "next/navigation";
import { skills, getFeaturedSkills, type Category } from "@/data/skills";
import { SkillCard } from "@/components/SkillCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { SearchInput } from "@/components/SearchInput";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function SkillsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  
  const [activeCategory, setActiveCategory] = useState<Category | "all" | "featured">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (activeCategory === "featured") {
      result = getFeaturedSkills();
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

    return result;
  }, [activeCategory, searchQuery, locale]);

  const title = locale === "zh" ? "发现 Agent Skills" : "Discover Agent Skills";
  const subtitle =
    locale === "zh"
      ? `浏览 ${skills.length}+ 个技能，增强你的 AI Agent 能力`
      : `Browse ${skills.length}+ skills to enhance your AI agent`;
  const searchPlaceholder = locale === "zh" ? "搜索 skills..." : "Search skills...";
  const noResultsText = locale === "zh" ? "没有找到匹配的 skills" : "No skills found matching your criteria";
  const clearFiltersText = locale === "zh" ? "清除筛选" : "Clear filters";

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="font-bold text-xl text-zinc-900 dark:text-white"
            >
              Open Agent Skills
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {locale === "zh" ? "首页" : "Home"}
              </Link>
              <Link
                href="/skills"
                className="text-zinc-900 dark:text-white font-medium"
              >
                Skills
              </Link>
              <Link
                href="/docs/introduction"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {locale === "zh" ? "文档" : "Docs"}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href="https://github.com/Open-Agent-Labs/Open-Agent-Skills"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </Link>
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

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

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Open Agent Skills. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
