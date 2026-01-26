import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { SkillCard } from "@/components/SkillCard";
import { getSkills, getSkillsCount } from "@/lib/d1";
import type { Locale } from "@/i18n/routing";
import {
  buildAlternates,
  buildUrl,
  formatTitle,
  getHomeKeywords,
  getOpenGraphImages,
  getOpenGraphLocale,
  SITE_NAME,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  // Use a shorter title for homepage to avoid truncation
  const shortTitle = locale === "zh"
    ? "Open Agent Skills — AI 代理技能分享平台"
    : "Open Agent Skills — AI Agent Skills Hub";
  const title = formatTitle(shortTitle);
  const description = t("description");
  const typedLocale = locale as Locale;

  return {
    title,
    description,
    keywords: getHomeKeywords(typedLocale),
    alternates: buildAlternates(typedLocale, "/"),
    openGraph: {
      title,
      description,
      url: buildUrl(typedLocale, "/"),
      siteName: SITE_NAME,
      type: "website",
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

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const featuredSkills = await getSkills({ featured: true, limit: 6 });
  const totalCount = await getSkillsCount();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <SiteHeader current="home" />

      <main className="pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/skills"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer"
            >
              {t("browseSkills")}
            </Link>
            <Link
              href="/docs/introduction"
              className="px-8 py-3 border-2 border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              {t("getStarted")}
            </Link>


          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50">
                {t("featuredSkills")}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                {t("discoverSkills", { count: totalCount })}
              </p>
            </div>
            <Link
              href="/skills"
              className="hidden sm:inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              {t("viewAll")}
              <span>→</span>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} locale={locale} />
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
            >
              {t("viewAllSkills")}
              <span>→</span>
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-20">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              {t("whyTitle")}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {t("whyDescription")}
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-16">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-50 mb-12">
            {t("features.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              title={t("features.expertise.title")}
              description={t("features.expertise.description")}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
            <FeatureCard
              title={t("features.capabilities.title")}
              description={t("features.capabilities.description")}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <FeatureCard
              title={t("features.workflows.title")}
              description={t("features.workflows.description")}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              }
            />
            <FeatureCard
              title={t("features.interoperability.title")}
              description={t("features.interoperability.description")}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-50 mb-12">
            {t("getStartedTitle")}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GetStartedCard
              href="/docs/introduction"
              title={t("getStartedCards.what.title")}
              description={t("getStartedCards.what.description")}
            />
            <GetStartedCard
              href="/docs/specification"
              title={t("getStartedCards.specification.title")}
              description={t("getStartedCards.specification.description")}
            />
            <GetStartedCard
              href="/docs/integrating"
              title={t("getStartedCards.integrate.title")}
              description={t("getStartedCards.integrate.description")}
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-50 mb-12">
            {t("faq.title")}
          </h2>
          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <FAQItem
                key={i}
                question={t(`faq.items.${i}.question`)}
                answer={t(`faq.items.${i}.answer`)}
              />
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [0, 1, 2, 3, 4].map((i) => ({
                  "@type": "Question",
                  name: t(`faq.items.${i}.question`),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: t(`faq.items.${i}.answer`),
                  },
                })),
              }),
            }}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200">
      <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-2">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
}

function GetStartedCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 hover:shadow-lg cursor-pointer"
    >
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
        <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>
    </Link>
  );
}

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200 cursor-pointer">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 pr-4">
          {question}
        </h3>
        <svg
          className="w-5 h-5 text-slate-500 dark:text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
