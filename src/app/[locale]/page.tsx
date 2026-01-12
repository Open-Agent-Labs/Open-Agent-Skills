import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const nav = await getTranslations("nav");

  const docsPath = locale === "en" ? "/docs/getting-started" : `/${locale}/docs/getting-started`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800">
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href={locale === "en" ? "/" : `/${locale}`}
              className="font-bold text-xl text-zinc-900 dark:text-white"
            >
              Open Agent Skills
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href={locale === "en" ? "/" : `/${locale}`}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {nav("home")}
              </Link>
              <Link
                href={docsPath}
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
              >
                {nav("docs")}
              </Link>
            </div>
          </div>
          <LanguageSwitcher />
        </nav>
      </header>

      <main className="pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            {t("title")}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={docsPath}
              className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              {t("getStarted")}
            </Link>
            <Link
              href={docsPath}
              className="px-8 py-3 border border-zinc-300 rounded-full font-medium text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {t("viewDocs")}
            </Link>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-32">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            {t("features.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title={t("features.i18n.title")}
              description={t("features.i18n.description")}
              icon="🌐"
            />
            <FeatureCard
              title={t("features.mdx.title")}
              description={t("features.mdx.description")}
              icon="📝"
            />
            <FeatureCard
              title={t("features.deploy.title")}
              description={t("features.deploy.description")}
              icon="🚀"
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-zinc-500 dark:text-zinc-500">
          © {new Date().getFullYear()} Open Agent Skills. All rights reserved.
        </div>
      </footer>
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
  icon: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
