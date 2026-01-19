import { routing, type Locale } from "@/i18n/routing";

export const SITE_URL = "https://openagentskills.dev";
export const SITE_NAME = "Open Agent Skills";
export const OG_IMAGE_PATH = "/og.svg";
export const OG_IMAGE_ALT = "Open Agent Skills";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export function localizedPath(locale: Locale, path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;

  if (locale === routing.defaultLocale) {
    return normalized;
  }

  return `/${locale}${normalized === "/" ? "" : normalized}`;
}

export function buildUrl(locale: Locale, path: string): URL {
  return new URL(localizedPath(locale, path), SITE_URL);
}

export function buildAlternates(locale: Locale, path: string) {
  const languages: Record<string, string> = {};

  for (const supportedLocale of routing.locales) {
    languages[supportedLocale] = buildUrl(supportedLocale, path).toString();
  }

  languages["x-default"] = buildUrl(routing.defaultLocale, path).toString();

  return {
    canonical: buildUrl(locale, path).toString(),
    languages,
  };
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "zh" ? "zh_CN" : "en_US";
}

export function getOpenGraphImages() {
  return [
    {
      url: new URL(OG_IMAGE_PATH, SITE_URL).toString(),
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: OG_IMAGE_ALT,
    },
  ];
}
