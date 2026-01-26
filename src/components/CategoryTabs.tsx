"use client";

import { Link } from "@/i18n/navigation";
import { categories } from "@/data/categories";
import type { Category } from "@/data/skills";

interface CategoryTabsProps {
  activeCategory: Category | "all" | "featured";
  buildHref: (category: Category | "all" | "featured") => string;
  locale: string;
}

export function CategoryTabs({
  activeCategory,
  buildHref,
  locale,
}: CategoryTabsProps) {
  const allLabel = locale === "zh" ? "全部" : "All";
  const featuredLabel = locale === "zh" ? "精选" : "Featured";

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === "all"
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        }`}
      >
        {allLabel}
      </Link>
      <Link
        href={buildHref("featured")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === "featured"
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
        }`}
      >
        ⭐ {featuredLabel}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildHref(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat.id
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {cat.icon} {locale === "zh" ? cat.nameZh : cat.name}
        </Link>
      ))}
    </div>
  );
}
