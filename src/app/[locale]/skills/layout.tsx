import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { skills } from "@/data/skills";
import {
  buildAlternates,
  buildUrl,
  formatTitle,
  getSkillsKeywords,
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
  const t = await getTranslations({ locale, namespace: "skills" });
  const typedLocale = locale as Locale;
  const title = formatTitle(t("title"));
  const description = t("subtitle", { count: skills.length });

  return {
    title,
    description,
    keywords: getSkillsKeywords(typedLocale),
    alternates: buildAlternates(typedLocale, "/skills"),
    openGraph: {
      title,
      description,
      url: buildUrl(typedLocale, "/skills"),
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

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
