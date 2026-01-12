import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getContentBySlug, getContentSlugs } from "@/lib/mdx";
import { routing, type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../../mdx-components";

export function generateStaticParams() {
  const paths: { locale: string; slug: string[] }[] = [];

  for (const locale of routing.locales) {
    const slugs = getContentSlugs(locale, "docs");
    for (const slug of slugs) {
      paths.push({ locale, slug: [slug] });
    }
    paths.push({ locale, slug: [] });
  }

  return paths;
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("docs");
  const nav = await getTranslations("nav");

  const slugPath = slug?.join("/") || "getting-started";
  const content = await getContentBySlug(locale as Locale, "docs", slugPath);

  if (!content && slug && slug.length > 0) {
    notFound();
  }

  const homePath = locale === "en" ? "/" : `/${locale}`;
  const docsPath = locale === "en" ? "/docs" : `/${locale}/docs`;

  const components = useMDXComponents({});

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href={homePath}
              className="font-bold text-xl text-zinc-900 dark:text-white"
            >
              Open Agent Skills
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={homePath}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {nav("home")}
              </Link>
              <Link
                href={`${docsPath}/getting-started`}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {nav("docs")}
              </Link>
            </div>
          </div>
          <LanguageSwitcher />
        </nav>
      </header>

      <main className="pt-24 pb-20 max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Link
            href={homePath}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← {t("backToHome")}
          </Link>
        </div>

        {content ? (
          <article className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote source={content.content} components={components} />
          </article>
        ) : (
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
              {t("title")}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8">
              Select a document to view
            </p>
            <div className="flex flex-col gap-2 items-center">
              <Link
                href={`${docsPath}/getting-started`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Getting Started
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
