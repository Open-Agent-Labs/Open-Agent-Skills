"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";

interface DocItem {
  slug: string;
  title: string;
  order?: number;
  group?: string;
}

interface DocsGroup {
  id: string;
  label: string;
  docs: DocItem[];
}

interface DocsSidebarProps {
  groups: DocsGroup[];
  locale: string;
  currentSlug?: string;
}

export function DocsSidebar({ groups, currentSlug }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 hidden lg:block">
      <nav className="sticky top-24 space-y-6">
        {groups.map((group) => (
          <div key={group.id}>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {group.label}
            </h3>
            <ul className="space-y-1">
              {group.docs.map((doc) => {
                const href = `/docs/${doc.slug}`;
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
          </div>
        ))}
      </nav>
    </aside>
  );
}

interface MobileDocsSidebarProps {
  groups: DocsGroup[];
  locale: string;
  currentSlug?: string;
}

export function MobileDocsSidebar({ groups, locale, currentSlug }: MobileDocsSidebarProps) {
  const router = useRouter();

  return (
    <div className="lg:hidden mb-8">
      <select
        className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
        value={currentSlug || ""}
        onChange={(e) => {
          if (e.target.value) {
            router.push(`/docs/${e.target.value}`);
          }
        }}
      >
        <option value="" disabled>
          {locale === "zh" ? "选择文档" : "Select a document"}
        </option>
        {groups.map((group) => (
          <optgroup key={group.id} label={group.label}>
            {group.docs.map((doc) => (
              <option key={doc.slug} value={doc.slug}>
                {doc.title}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
