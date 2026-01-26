import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { DetailTabs } from "@/components/DetailTabs";
import { Footer } from "@/components/Footer";
import { GitHubRepoTree } from "@/components/GitHubRepoTree";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillCard } from "@/components/SkillCard";
import type { Skill } from "@/data/skills";
import { getCategoryById } from "@/data/categories";
import { getSkillById, getSkills } from "@/lib/d1";
import type { Locale } from "@/i18n/routing";
import { parseGitHubUrl, fetchRepoMeta } from "@/lib/github";
import {
  buildAlternates,
  buildUrl,
  formatTitle,
  getSkillKeywords,
  getOpenGraphImages,
  getOpenGraphLocale,
  SITE_NAME,
} from "@/lib/seo";

export const dynamic = "force-dynamic";

const getSkillCached = cache(async (id: string): Promise<Skill | null> => getSkillById(id));

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const typedLocale = locale as Locale;
  const skill = await getSkillCached(id);

  if (!skill) {
    return {};
  }

  const category = getCategoryById(skill.category);
  const description =
    typedLocale === "zh" ? skill.descriptionZh || skill.description : skill.description;
  const title = formatTitle(`${skill.name} | ${SITE_NAME}`);
  const path = `/skills/${skill.id}`;

  return {
    title,
    description,
    keywords: getSkillKeywords(typedLocale, {
      name: skill.name,
      tags: skill.tags,
      category: category?.name,
      categoryZh: category?.nameZh,
    }),
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

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(locale);

  const skill = await getSkillCached(id);
  if (!skill) {
    notFound();
  }

  const category = getCategoryById(skill.category);
  const relatedSkills = (await getSkills({
    category: skill.category,
    limit: 4,
  }))
    .filter((s) => s.id !== skill.id)
    .slice(0, 3);
  const description = locale === "zh" ? skill.descriptionZh || skill.description : skill.description;
  const overviewContent = locale === "zh" ? skill.contentZh || skill.content : skill.content;
  const skillUrl = buildUrl(typedLocale, `/skills/${skill.id}`).toString();
  const skillJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: skill.name,
    description,
    url: skillUrl,
    inLanguage: locale,
    keywords: skill.tags?.join(", "),
    author: skill.author
      ? {
        "@type": "Person",
        name: skill.author,
      }
      : undefined,
    isBasedOn: skill.repository,
    about: category ? (locale === "zh" ? category.nameZh : category.name) : undefined,
    image: getOpenGraphImages()[0].url,
  };

  const isZh = locale === "zh";

  // Fetch GitHub repo metadata
  let repoMeta = null;
  const parsedRepo = parseGitHubUrl(skill.repository);
  if (parsedRepo) {
    try {
      repoMeta = await fetchRepoMeta(parsedRepo.owner, parsedRepo.repo, process.env.GITHUB_TOKEN);
    } catch (error) {
      console.error("Failed to fetch repo meta:", error);
    }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isZh ? "首页" : "Home",
        item: buildUrl(typedLocale, "/").toString(),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Skills",
        item: buildUrl(typedLocale, "/skills").toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: skill.name,
        item: skillUrl,
      },
    ],
  };

  const installCommand = `git clone ${skill.repository}`;
  const fullInstallBlock = `# Clone the skill repository
git clone ${skill.repository}

# Or add to your agent's skills directory
cp -r ${skill.id} ~/.config/claude/skills/`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader current="skills" />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              {isZh ? "首页" : "Home"}
            </Link>
            <span>/</span>
            <Link href="/skills" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Skills
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-white">{skill.name}</span>
          </nav>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex items-start gap-5 flex-1">
                <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl shadow-lg">
                  {category?.icon || "📦"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
                      {skill.name}
                    </h1>
                    {skill.official && (
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
                        Official
                      </span>
                    )}
                    {skill.featured && !skill.official && (
                      <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  {skill.author && (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700">
                        <svg className="w-3 h-3 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        {skill.author}
                      </span>
                    </div>
                  )}

                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3 text-sm md:text-base">
                    {description}
                  </p>

                  {repoMeta && (
                    <div className="flex flex-wrap items-center gap-y-3 gap-x-6 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400" title={isZh ? "Star 数量" : "Stars"}>
                        <svg className="w-4.5 h-4.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{repoMeta.stars.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400" title={isZh ? "Fork 数量" : "Forks"}>
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M12 11v4" />
                        </svg>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{repoMeta.forks.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>
                          {isZh ? "更新于" : "Updated"} {new Date(repoMeta.updatedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                        <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <Link href={skill.repository} target="_blank" className="font-medium hover:text-blue-500 transition-colors truncate max-w-[200px]">
                          {parsedRepo ? `${parsedRepo.owner}/${parsedRepo.repo}` : skill.repository}
                        </Link>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-shrink-0">
                <Link
                  href={skill.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
                  title={isZh ? "查看源码" : "View Source"}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <Link
                href={`/skills?category=${skill.category}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >

                <span>{category?.icon}</span>
                <span>{isZh ? category?.nameZh : category?.name}</span>
              </Link>
              {skill.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-md text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <DetailTabs
            locale={locale}
            children={{
              overview: (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                  {overviewContent ? (
                    <MarkdownRenderer content={overviewContent} />
                  ) : (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="text-blue-500">●</span>
                          {isZh ? `什么是 ${skill.name}？` : `What is ${skill.name}?`}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-4">
                          {description}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="text-green-500">●</span>
                          {isZh ? "如何使用？" : "How to use?"}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-4">
                          {isZh
                            ? `访问 GitHub 仓库获取详细的安装和使用说明。将 skill 文件添加到你的 Agent 配置中即可开始使用。`
                            : `Visit the GitHub repository for detailed installation and usage instructions. Add the skill files to your agent configuration to get started.`
                          }
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-medium text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                          <span className="text-purple-500">●</span>
                          {isZh ? "适用场景" : "Use Cases"}
                        </h3>
                        <ul className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed pl-4 space-y-1">
                          <li>• {isZh ? "增强 AI Agent 的特定领域能力" : "Enhance AI agent capabilities in specific domains"}</li>
                          <li>• {isZh ? "自动化重复性工作流程" : "Automate repetitive workflows"}</li>
                          <li>• {isZh ? "与其他 skills 组合使用" : "Combine with other skills for complex tasks"}</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ),
              files: (
                <GitHubRepoTree repositoryUrl={skill.repository} locale={locale} />
              ),
              quickstart: (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8">
                  <div className="bg-zinc-950 rounded-xl p-4 overflow-x-auto">
                    <pre className="text-sm text-zinc-300">
                      <code>{fullInstallBlock}</code>
                    </pre>
                  </div>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
                    {isZh
                      ? "更多详细信息请参考 GitHub 仓库中的 README 文件。"
                      : "For more details, please refer to the README file in the GitHub repository."
                    }
                  </p>
                </div>
              )
            }}
          />

          {relatedSkills.length > 0 && (
            <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {isZh ? "相关 Skills" : "Related Skills"}
                </h2>
                <Link
                  href={`/skills?category=${skill.category}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {isZh ? "查看更多" : "View more"} →
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                {relatedSkills.map((relatedSkill) => (
                  <SkillCard
                    key={relatedSkill.id}
                    skill={relatedSkill}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
