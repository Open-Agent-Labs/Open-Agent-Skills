"use client";

import { Link } from "@/i18n/navigation";
import type { Skill } from "@/data/skills";
import { getCategoryById } from "@/data/categories";

interface SkillCardProps {
  skill: Skill;
  locale: string;
}

export function SkillCard({ skill, locale }: SkillCardProps) {
  const category = getCategoryById(skill.category);
  const description = locale === "zh" ? skill.descriptionZh || skill.description : skill.description;

  return (
    <Link
      href={`/skills/${skill.id}`}
      className="group block p-5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xl">
          {category?.icon || "📦"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {skill.name}
            </h3>
            {skill.official && (
              <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded">
                Official
              </span>
            )}
            {skill.featured && !skill.official && (
              <span className="flex-shrink-0 px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {skill.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {skill.author && (
              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                @{skill.author}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
