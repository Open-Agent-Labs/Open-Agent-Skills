# SEO Audit Checklist (Local Repo)

## Table of Contents
- Scope and limitations
- Metadata foundations
- Indexability and discovery
- Canonical and hreflang
- Structured data (JSON-LD)
- Content semantics
- Media and accessibility hints
- Internal linking and navigation
- Next.js App Router specifics
- Reporting guidance

## Scope and limitations
- This checklist is for static code review of a local repository.
- Do not claim live crawl or performance results unless a runtime audit is executed.
- When a check depends on runtime values, call out the gap and suggest a follow-up.

## Metadata foundations
- **Title**: Each indexable page should define a unique, descriptive title.
- **Meta description**: Provide a concise summary per page.
- **metadataBase**: Ensure absolute URLs for Open Graph and canonical.
- **Open Graph**: title, description, url, siteName, images.
- **Twitter**: card, title, description, images.
- **Robots meta**: Avoid accidental `noindex`/`nofollow` on production routes.
- **Locale**: Confirm `<html lang>` is set and consistent with route locale.

Common Next.js locations:
- `src/app/layout.tsx` or `src/app/[locale]/layout.tsx`
- `export const metadata = { ... }` or `export async function generateMetadata(...)`

## Indexability and discovery
- **robots.txt** exists and allows intended indexing.
- **sitemap.xml** exists and includes canonical URLs.
- Sitemap supports alternate languages if site is multilingual.

Common locations:
- `public/robots.txt`, `public/sitemap.xml`
- `src/app/robots.ts`, `src/app/sitemap.ts`

## Canonical and hreflang
- Add canonical URLs for pages with multiple URL variants.
- Use hreflang/alternates for multilingual content.
- Ensure canonical URLs match the preferred locale/version.

Next.js pattern:
- `metadata.alternates = { canonical, languages: { ... } }`

## Structured data (JSON-LD)
- Include JSON-LD where relevant (Organization, WebSite, BreadcrumbList, Article).
- Validate JSON-LD fields and use absolute URLs.
- Avoid invalid or incomplete schemas.

## Content semantics
- Single H1 per page.
- Logical heading hierarchy (H2 after H1, etc.).
- Avoid empty or duplicate headings.

## Media and accessibility hints
- Images should have meaningful `alt` text.
- Prefer `next/image` and ensure width/height are set.
- Avoid missing `alt` on decorative images (use empty alt only if truly decorative).

## Internal linking and navigation
- Ensure key pages are linked in navigation or content.
- Avoid orphan pages that are not reachable via links.
- Use descriptive anchor text (avoid "click here").

## Next.js App Router specifics
- Prefer `metadata` or `generateMetadata` over manual `<Head>` in App Router.
- Check dynamic routes to ensure metadata is defined for each param.
- Ensure `metadataBase` is configured once at root layout.
- Verify `app/not-found.tsx` exists and returns helpful content.

## Reporting guidance
- Provide findings ordered by severity: Critical, High, Medium, Low.
- Include file paths and relevant code evidence.
- Separate "missing" vs. "needs runtime validation" items.
- Offer targeted fixes (code snippets or config guidance) when possible.
