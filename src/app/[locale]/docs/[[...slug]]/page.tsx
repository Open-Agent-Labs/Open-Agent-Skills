import Link from "next/link";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getContentBySlug, getDocsGrouped, getAllDocsMetadata } from "@/lib/mdx";
import { routing, type Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { DocsSidebar, MobileDocsSidebar } from "@/components/DocsSidebar";
import { DocsNavigation } from "@/components/DocsNavigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "../../../../../mdx-components";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";

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

export default async function DocsPage({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const slugPath = slug?.join("/") || "introduction";
  const content = await getContentBySlug(locale as Locale, "docs", slugPath);
  const groups = await getDocsGrouped(locale as Locale);
  const allDocs = await getAllDocsMetadata(locale as Locale);

  if (!content && slug && slug.length > 0) {
    notFound();
  }

  const homePath = locale === "en" ? "/" : `/${locale}`;
  const docsPath = locale === "en" ? "/docs" : `/${locale}/docs`;

  const components = useMDXComponents({});

  const navLabels = {
    home: locale === "zh" ? "首页" : "Home",
    docs: locale === "zh" ? "文档" : "Docs",
    backToHome: locale === "zh" ? "返回首页" : "Back to Home",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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
                {navLabels.home}
              </Link>
              <Link
                href={`${docsPath}/introduction`}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {navLabels.docs}
              </Link>
              <Link
                href="https://github.com/agentskills/agentskills"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
          <LanguageSwitcher />
        </nav>
      </header>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
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
                href={homePath}
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
                    href={`${docsPath}/introduction`}
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
    </div>
  );
}
