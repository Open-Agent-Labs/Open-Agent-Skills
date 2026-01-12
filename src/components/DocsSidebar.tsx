"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface DocItem {
  slug: string;
  title: string;
  order?: number;
}

interface DocsSidebarProps {
  docs: DocItem[];
  locale: string;
  currentSlug?: string;
}

export function DocsSidebar({ docs, locale, currentSlug }: DocsSidebarProps) {
  const pathname = usePathname();
  const docsBasePath = locale === "en" ? "/docs" : `/${locale}/docs`;

  const sortedDocs = [...docs].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-24 space-y-1">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-4 text-sm uppercase tracking-wide">
          {locale === "zh" ? "文档" : "Documentation"}
        </h3>
        <ul className="space-y-1">
          {sortedDocs.map((doc) => {
            const href = `${docsBasePath}/${doc.slug}`;
            const isActive = currentSlug === doc.slug || pathname === href;

            return (
              <li key={doc.slug}>
                <Link
                  href={href}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-medium"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
                  }`}
                >
                  {doc.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

export function MobileDocsSidebar({ docs, locale, currentSlug }: DocsSidebarProps) {
  const docsBasePath = locale === "en" ? "/docs" : `/${locale}/docs`;

  const sortedDocs = [...docs].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });

  return (
    <div className="lg:hidden mb-8">
      <select
        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
        value={currentSlug || ""}
        onChange={(e) => {
          if (e.target.value) {
            window.location.href = `${docsBasePath}/${e.target.value}`;
          }
        }}
      >
        <option value="" disabled>
          {locale === "zh" ? "选择文档" : "Select a document"}
        </option>
        {sortedDocs.map((doc) => (
          <option key={doc.slug} value={doc.slug}>
            {doc.title}
          </option>
        ))}
      </select>
    </div>
  );
}
