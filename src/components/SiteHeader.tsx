"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

type NavItem = "home" | "skills" | "docs";

interface SiteHeaderProps {
  current: NavItem;
}

export function SiteHeader({ current }: SiteHeaderProps) {
  const t = useTranslations("nav");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItemClasses = (isActive: boolean): string =>
    isActive
      ? "text-slate-900 dark:text-slate-50 font-semibold"
      : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors duration-200";

  const mobileNavItemClasses = (isActive: boolean): string =>
    isActive
      ? "block px-4 py-3 text-slate-900 dark:text-slate-50 font-semibold bg-slate-100 dark:bg-slate-800 rounded-lg"
      : "block px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors duration-200";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-bold text-xl text-slate-900 dark:text-slate-50 tracking-tight"
          >
            Open Agent Skills
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={navItemClasses(current === "home")}
              aria-current={current === "home" ? "page" : undefined}
            >
              {t("home")}
            </Link>
            <Link
              href="/skills"
              className={navItemClasses(current === "skills")}
              aria-current={current === "skills" ? "page" : undefined}
            >
              {t("skills")}
            </Link>
            <Link
              href="/docs/introduction"
              className={navItemClasses(current === "docs")}
              aria-current={current === "docs" ? "page" : undefined}
            >
              {t("docs")}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="https://github.com/Open-Agent-Labs/Open-Agent-Skills"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            aria-label="GitHub"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </Link>
          <LanguageSwitcher />
          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className={mobileNavItemClasses(current === "home")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={current === "home" ? "page" : undefined}
            >
              {t("home")}
            </Link>
            <Link
              href="/skills"
              className={mobileNavItemClasses(current === "skills")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={current === "skills" ? "page" : undefined}
            >
              {t("skills")}
            </Link>
            <Link
              href="/docs/introduction"
              className={mobileNavItemClasses(current === "docs")}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={current === "docs" ? "page" : undefined}
            >
              {t("docs")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
