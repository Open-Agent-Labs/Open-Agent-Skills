import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { DocsNavigation } from "@/components/DocsNavigation";
import { DocsSidebar, MobileDocsSidebar } from "@/components/DocsSidebar";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { getAllDocsMetadata, getContentBySlug, getDocsGrouped } from "@/lib/mdx";
import {
  buildAlternates,
  buildUrl,
  formatTitle,
  getDocsKeywords,
  getOpenGraphImages,
  getOpenGraphLocale,
  localizedPath,
  SITE_NAME,
} from "@/lib/seo";
import { useMDXComponents } from "../../../../../mdx-components";

// rehype-pretty-code 配置
const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

export function generateStaticParams() {
  const paths: { locale: string; slug: string[] }[] = [];
  const slugs = [
    "introduction",
    "quickstart",
    "concepts",
    "writing-skill-md",
    "scripts-and-resources",
    "best-practices",
    "using-skills",
    "integrating",
    "specification",
    "examples",
  ];

  for (const locale of routing.locales) {
    for (const slug of slugs) {
      paths.push({ locale, slug: [slug] });
    }
    paths.push({ locale, slug: [] });
  }

  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const slugPath = slug?.join("/") || "introduction";
  const content = await getContentBySlug(typedLocale, "docs", slugPath);
  const metadataT = await getTranslations({ locale, namespace: "metadata" });
  const docsT = await getTranslations({ locale, namespace: "docs" });
  const path = `/docs/${slugPath}`;
  const pageTitle = content?.title || docsT("title");
  const title = formatTitle(`${pageTitle} | ${SITE_NAME}`);
  const description = content?.description || metadataT("description");

  return {
    title,
    description,
    keywords: getDocsKeywords(typedLocale, pageTitle),
    alternates: buildAlternates(typedLocale, path),
    openGraph: {
      title,
      description,
      url: buildUrl(typedLocale, path),
      siteName: SITE_NAME,
      type: "article",
      locale: getOpenGraphLocale(typedLocale),
      images: getOpenGraphImages(),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [getOpenGraphImages()[0].url],
    },
  };
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;

  if (!slug || slug.length === 0) {
    redirect(localizedPath(typedLocale, "/docs/introduction"));
  }

  setRequestLocale(locale);

  const slugPath = slug.join("/");
  const content = await getContentBySlug(typedLocale, "docs", slugPath);
  const groups = await getDocsGrouped(typedLocale);
  const allDocs = await getAllDocsMetadata(typedLocale);

  if (!content && slug && slug.length > 0) {
    notFound();
  }

  const components = useMDXComponents({});

  const navLabels = {
    home: locale === "zh" ? "首页" : "Home",
    docs: locale === "zh" ? "文档" : "Docs",
    backToHome: locale === "zh" ? "返回首页" : "Back to Home",
  };
  const breadcrumbJsonLd = content
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: navLabels.home,
            item: buildUrl(typedLocale, "/").toString(),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: navLabels.docs,
            item: buildUrl(typedLocale, "/docs/introduction").toString(),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: content.title,
            item: buildUrl(typedLocale, `/docs/${slugPath}`).toString(),
          },
        ],
      }
    : null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {breadcrumbJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      ) : null}
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
                {navLabels.home}
              </Link>
              <Link
                href="/docs/introduction"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {navLabels.docs}
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

      <div className="pt-24 pb-20 max-w-6xl mx-auto px-6">
        <div className="flex gap-12">
          <DocsSidebar
            groups={groups}
            locale={locale}
            currentSlug={slugPath}
          />

          <main className="flex-1 min-w-0">
            <MobileDocsSidebar
              groups={groups}
              locale={locale}
              currentSlug={slugPath}
            />

            <div className="mb-6">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                ← {navLabels.backToHome}
              </Link>
            </div>

            {content ? (
              <>
                <article className="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:before:content-none prose-code:after:content-none">
                  <MDXRemote
                    source={content.content}
                    components={components}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
                      },
                    }}
                  />
                </article>
                <DocsNavigation
                  docs={allDocs}
                  currentSlug={slugPath}
                  locale={locale}
                />
              </>
            ) : (
              <div className="text-center py-20">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
                  {locale === "zh" ? "文档" : "Documentation"}
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  {locale === "zh" ? "选择一个文档查看" : "Select a document to view"}
                </p>
                <div className="flex flex-col gap-2 items-center">
                  <Link
                    href="/docs/introduction"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {locale === "zh" ? "简介" : "Introduction"}
                  </Link>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Open Agent Skills. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
