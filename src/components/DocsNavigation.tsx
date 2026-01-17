import { Link } from "@/i18n/navigation";

interface DocItem {
  slug: string;
  title: string;
  order?: number;
}

interface DocsNavigationProps {
  docs: DocItem[];
  currentSlug: string;
  locale: string;
}

export function DocsNavigation({ docs, currentSlug, locale }: DocsNavigationProps) {
  const sortedDocs = [...docs].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return a.slug.localeCompare(b.slug);
  });

  const currentIndex = sortedDocs.findIndex((doc) => doc.slug === currentSlug);
  const prevDoc = currentIndex > 0 ? sortedDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : null;

  if (!prevDoc && !nextDoc) {
    return null;
  }

  return (
    <nav className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
      {prevDoc ? (
        <Link
          href={`/docs/${prevDoc.slug}`}
          className="group flex flex-col items-start"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            {locale === "zh" ? "上一篇" : "Previous"}
          </span>
          <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 font-medium flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {prevDoc.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextDoc ? (
        <Link
          href={`/docs/${nextDoc.slug}`}
          className="group flex flex-col items-end"
        >
          <span className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
            {locale === "zh" ? "下一篇" : "Next"}
          </span>
          <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 font-medium flex items-center gap-2">
            {nextDoc.title}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
