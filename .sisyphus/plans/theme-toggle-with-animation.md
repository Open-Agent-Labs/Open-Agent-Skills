# Theme Toggle with Circle Expand Animation

## Overview
Fix existing theme switching issues and add View Transitions API circle expand animation.

## Tasks

### Task 1: Update globals.css - Enable Tailwind v4 Dark Mode
**File:** `src/app/globals.css`
**Priority:** HIGH

**Changes:**
1. Add `@custom-variant dark (&:where(.dark, .dark *));` after `@import "tailwindcss";`
2. Wrap CSS variables in `@layer base { ... }`
3. Add `.dark` selector for dark mode variables
4. Add View Transition CSS for circle animation

**Code to add after `@import "tailwindcss";`:**
```css
/* Enable class-based dark mode (Tailwind v4) */
@custom-variant dark (&:where(.dark, .dark *));
```

**Replace the `:root` and `@media (prefers-color-scheme: dark)` block with:**
```css
@layer base {
  :root {
    --background: #ffffff;
    --foreground: #171717;
  }

  .dark {
    --background: #0a0a0a;
    --foreground: #ededed;
  }

  body {
    background: var(--background);
    color: var(--foreground);
    font-family: Arial, Helvetica, sans-serif;
  }
}
```

**Add View Transition styles (after @layer base, before code block styling):**
```css
/* ========================================
   View Transition - Circle Expand Animation
   ======================================== */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

.dark::view-transition-old(root) {
  z-index: 1;
}

.dark::view-transition-new(root) {
  z-index: 999;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}
```

---

### Task 2: Add ThemeToggle to Docs Page
**File:** `src/app/[locale]/docs/[[...slug]]/page.tsx`
**Priority:** HIGH

**Changes:**
1. Add import: `import { ThemeToggle } from "@/components/ThemeToggle";`
2. Replace line 108 `<LanguageSwitcher />` with:
```tsx
<div className="flex items-center gap-3">
  <ThemeToggle />
  <LanguageSwitcher />
</div>
```

---

### Task 3: Rewrite ThemeToggle Component with Animation
**File:** `src/components/ThemeToggle.tsx`
**Priority:** MEDIUM

**Full replacement code:**
```tsx
"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const newIsDark = !isDark;

    // Calculate animation origin and radius
    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Check for View Transitions API support
    const supportsViewTransitions = 
      typeof document !== "undefined" && 
      "startViewTransition" in document &&
      typeof document.startViewTransition === "function";

    if (supportsViewTransitions) {
      const transition = document.startViewTransition!(() => {
        updateTheme(newIsDark);
      });

      try {
        await transition.ready;

        // Circle expand animation
        document.documentElement.animate(
          {
            clipPath: newIsDark
              ? [`circle(${endRadius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]
              : [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 400,
            easing: "ease-in-out",
            pseudoElement: newIsDark
              ? "::view-transition-old(root)"
              : "::view-transition-new(root)",
          }
        );
      } catch {
        // Animation failed, theme already updated
      }
    } else {
      // Fallback for unsupported browsers
      updateTheme(newIsDark);
    }
  };

  const updateTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
```

---

### Task 4: Add TypeScript Type Declaration
**File:** `src/types/view-transitions.d.ts`
**Priority:** LOW

**Create new file with content:**
```typescript
interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
}

interface Document {
  startViewTransition?(callback: () => void | Promise<void>): ViewTransition;
}
```

---

## Verification Steps

1. Run `pnpm dev` to start development server
2. Test theme toggle on all pages:
   - Home page (`/`)
   - Skills page (`/skills`)
   - Skill detail page (`/skills/[id]`)
   - Docs page (`/docs/introduction`)
3. Verify circle expand animation works in Chrome/Edge
4. Verify fallback works in Safari/Firefox (instant toggle, no animation)
5. Verify theme persists across page refreshes

## Expected Behavior

- **Animation**: Circle expands from click position
- **Duration**: 400ms
- **Light to Dark**: Circle expands revealing dark theme
- **Dark to Light**: Circle contracts revealing light theme
- **Persistence**: Theme saved to localStorage
