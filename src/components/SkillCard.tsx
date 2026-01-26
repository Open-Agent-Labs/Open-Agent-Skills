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
      className="group block p-6 rounded-xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-lg cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-2xl">
          {category?.icon || "📦"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {skill.name}
            </h3>
            {skill.official && (
              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-md border border-blue-200 dark:border-blue-800">
                Official
              </span>
            )}
            {skill.featured && !skill.official && (
              <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-md border border-amber-200 dark:border-amber-800">
                Featured
              </span>
            )}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {skill.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            {skill.author && (
              <span className="text-xs text-slate-500 dark:text-slate-500 font-mono">
                @{skill.author}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
