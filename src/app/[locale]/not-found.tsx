import { headers } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default async function NotFound() {
  const headersList = await headers();
  const referer = headersList.get("referer") || "";
  
  // Extract locale from referer URL
  const locale = (referer.match(/\/(en|zh)(\/|$)/) || ["", "en"])[1] as Locale;
  
  setRequestLocale(locale);
  const t = await getTranslations("notFound");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-zinc-700 dark:text-zinc-300 mb-6">
          {t("title")}
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md mx-auto">
          {t("description")}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
          >
            {t("goHome")}
          </Link>
          <Link
            href="/skills"
            className="px-6 py-3 border border-zinc-300 rounded-full font-medium text-zinc-700 hover:bg-zinc-50 transition-colors dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            {t("browseSkills")}
          </Link>
        </div>
      </div>
    </div>
  );
}
