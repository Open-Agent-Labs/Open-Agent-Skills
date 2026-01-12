"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/routing";

const languageNames: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    let newPath = pathname;

    if (locale === "en") {
      newPath = `/${newLocale}${pathname}`;
    } else if (newLocale === "en") {
      newPath = pathname.replace(`/${locale}`, "") || "/";
    } else {
      newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    }

    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            l === locale
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          }`}
        >
          {languageNames[l]}
        </button>
      ))}
    </div>
  );
}
