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
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
          activeCategory === "all"
            ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        {allLabel}
      </Link>
      <Link
        href={buildHref("featured")}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
          activeCategory === "featured"
            ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        ⭐ {featuredLabel}
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildHref(cat.id)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 cursor-pointer ${
            activeCategory === cat.id
              ? "bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-900"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {cat.icon} {locale === "zh" ? cat.nameZh : cat.name}
        </Link>
      ))}
    </div>
  );
}
