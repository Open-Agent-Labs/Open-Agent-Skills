---
name: seo-repo-audit
description: Audit a local web repository for Google SEO compliance and best practices, including metadata, indexability, structured data, sitemaps/robots, hreflang/canonical, and content semantics. Use when asked to review or verify SEO implementation in source code (especially Next.js App Router or React-based sites) without relying on live URLs.
---

# Seo Repo Audit

## Overview

Inspect local source code for SEO readiness and report actionable issues with file references and fixes, focusing on Google SEO guidelines and common Next.js App Router patterns.

## Workflow Decision Tree

1. **Identify stack and routing**
   - Confirm framework (Next.js App Router, Pages Router, or other).
   - Locate route entry points and layouts (e.g., `src/app/**/layout.tsx`, `src/pages/**`).

2. **Run quick inventory scans**
   - Use ripgrep to find metadata patterns and SEO assets.
   - Suggested commands:
     - `rg "export const metadata|generateMetadata" src`
     - `rg "metadataBase|openGraph|twitter|alternates|robots" src`
     - `rg "sitemap|robots" src public`
     - `rg "<Image|alt=" src`

3. **Check global SEO foundations**
   - Validate `<html lang>` and locale handling.
   - Confirm `metadata`/`generateMetadata` exists at root layout.
   - Ensure `metadataBase` is set for absolute URLs.

4. **Check per-route metadata coverage**
   - Ensure critical pages define `title`, `description`, `openGraph`, `twitter`.
   - Verify canonical or alternates when content duplicates or is translated.

5. **Verify indexability and discovery**
   - Inspect `robots.txt` and `sitemap.xml` (public or route handlers).
   - Detect accidental `noindex` or `nofollow` on production routes.

6. **Validate structured data**
   - Check for JSON-LD (Organization, WebSite, Breadcrumb, Article) where relevant.
   - Ensure URLs and sameAs use absolute URLs.

7. **Review content semantics**
   - Confirm single H1 per page, sensible heading hierarchy.
   - Verify image `alt` presence and meaningful text.
   - Spot thin content or missing internal links where obvious.

8. **Report findings**
   - Provide prioritized issues with file paths and reasoning.
   - Recommend fixes and note gaps that require runtime inspection.

## Output Format

When reporting, use this structure:

- **Findings (ordered by severity)**: Each item includes issue, evidence (file path + snippet or line), impact, and fix guidance.
- **Quick wins**: Low-effort fixes with high SEO impact.
- **Open questions**: Missing info that needs runtime or content review.

## Reference Checklist

Use `references/seo-checklist.md` for detailed checks and pass/fail guidance.

## Resources

### references/
SEO audit checklist with concrete, code-level criteria.
