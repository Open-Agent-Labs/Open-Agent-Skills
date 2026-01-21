# AGENTS.md - Open Agent Skills

## 项目概述

一个 Next.js 16 Web 应用，用于浏览和发现 Agent Skills（AI 代理的可复用能力）。支持国际化（中/英文）、深色模式、MDX 文档，以及 GitHub 集成用于查看技能仓库。

---

## 构建 / 检查 / 测试命令

```bash
# 安装依赖（需要 pnpm）
pnpm install

# 开发服务器（使用 Turbopack）
pnpm dev

# 生产构建
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# Cloudflare Workers 部署
pnpm build:worker    # 为 Cloudflare 构建
pnpm deploy          # 部署到 Cloudflare
pnpm preview         # 本地 Cloudflare 预览
```

**注意**：项目暂未配置测试框架，如需测试请添加 Vitest 或 Jest。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Next.js 16.1.1 (App Router) |
| React | 19.2.3 |
| 样式 | Tailwind CSS v4 |
| TypeScript | ^5 |
| 国际化 | next-intl ^4.7.0 |
| MDX | next-mdx-remote, @next/mdx |
| 代码高亮 | rehype-pretty-code, Shiki |
| 部署 | Cloudflare Workers (opennextjs-cloudflare) |
| 包管理器 | pnpm |

---

## 项目结构

```
src/
  app/
    [locale]/           # 基于语言的路由 (en, zh)
      page.tsx          # 首页
      layout.tsx        # 根布局（主题/国际化设置）
      skills/           # Skills 列表和详情页
      docs/             # 文档页面 (MDX)
    api/                # API 路由（GitHub 代理）
    globals.css         # 全局样式 + Tailwind 配置
  components/           # React 组件
  content/              # MDX 文档文件
  data/                 # 静态数据 (skills.ts, categories.ts)
  i18n/                 # 国际化配置
  lib/                  # 工具函数 (github.ts, mdx.ts)
  types/                # TypeScript 类型定义
messages/               # 国际化翻译文件 (en.json, zh.json)
```

---

## 代码风格指南

### TypeScript

- **启用严格模式** - 禁止使用 `as any`、`@ts-ignore`、`@ts-expect-error` 来压制错误
- 函数参数和返回值必须显式声明类型
- 对象结构优先使用 interface，联合类型/基本类型使用 type
- 使用 `type` 导入：`import type { Locale } from "@/i18n/routing"`

### 导入顺序

```typescript
// 顺序：1) 外部包 2) 内部别名 3) 相对路径
import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/i18n/routing";
import { parseGitHubUrl } from "./github";

// 路径别名：@/* 映射到 ./src/*
import { SkillCard } from "@/components/SkillCard";
import { skills } from "@/data/skills";
```

### 命名规范

| 元素 | 规范 | 示例 |
|------|------|------|
| 组件 | PascalCase | `SkillCard`, `ThemeToggle` |
| 文件（组件） | PascalCase.tsx | `SkillCard.tsx` |
| 文件（工具） | kebab-case.ts | `github.ts`, `mdx.ts` |
| 函数 | camelCase | `getSkillById`, `fetchRepoContents` |
| 类型/接口 | PascalCase | `Skill`, `GitHubTreeItem` |
| 常量 | SCREAMING_SNAKE_CASE | `GROUP_ORDER`, `GROUP_LABELS` |
| CSS 类名 | Tailwind 工具类 | `bg-zinc-900 dark:bg-white` |

### React 组件

```typescript
// 客户端组件 - 在文件顶部添加 "use client" 指令
"use client";

// Props 接口 - 显式定义
interface SkillCardProps {
  skill: Skill;
  locale: string;
}

// 导出命名函数（不使用默认导出）
export function SkillCard({ skill, locale }: SkillCardProps) {
  // 组件逻辑
}
```

### 服务端组件（App Router 默认）

```typescript
// 异步参数模式（Next.js 16）
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // ...
}
```

### 错误处理

```typescript
// API 路由 - 返回正确的错误响应
if (!owner || !repo) {
  return NextResponse.json(
    { error: "Missing required parameters" },
    { status: 400 }
  );
}

// try-catch 配合日志记录
try {
  const response = await fetch(url);
  // ...
} catch (error) {
  console.error("GitHub file fetch error:", error);
  return NextResponse.json(
    { error: "Failed to fetch file from GitHub" },
    { status: 500 }
  );
}
```

### 样式（Tailwind CSS v4）

```typescript
// 深色模式：基于 class，使用 "dark:" 前缀
className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"

// 响应式：移动优先，使用 md:/lg: 断点
className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"

// 悬停/过渡效果
className="hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
```

### 国际化（next-intl）

```typescript
// 服务端翻译
import { getTranslations, setRequestLocale } from "next-intl/server";

const t = await getTranslations("home");
const text = t("title");

// 语言感知路径
const skillsPath = locale === "en" ? "/skills" : `/${locale}/skills`;
```

---

## 数据管理

### Skills 数据（`src/data/skills.ts`）

```typescript
// 在 skills 数组中添加新技能
export const skills: Skill[] = [
  {
    id: "my-skill",           // URL 友好的 slug
    name: "My Skill",
    description: "简短描述",
    category: "development",   // 必须匹配 Category 类型
    repository: "https://github.com/user/repo",
    author: "username",
    tags: ["tag1", "tag2"],
    featured: false,           // 是否在首页展示
    official: false,           // 是否为官方技能
  },
];
```

### MDX 文档（`src/content/docs/`）

```markdown
---
title: "文档标题"
description: "简短描述"
order: 1
group: "getting-started"
---

# 内容

英文使用 `.mdx`，中文使用 `.zh.mdx`。
```

---

## 环境变量

```bash
# .env.local（可选 - 用于提高 GitHub API 速率限制）
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

---

## 关键模式

### GitHub API 代理

所有 GitHub API 请求通过 `/api/github/*` 路由：
- 添加认证 token（如已配置）
- 处理速率限制
- 缓存响应（1 小时重新验证）
- 从 `main` 分支回退到 `master` 分支

### 深色模式

- 基于 class：在 `<html>` 上添加 `.dark` 类
- 持久化到 localStorage
- 使用 View Transitions API 实现平滑切换动画

### 静态生成

- Skills 和文档页面使用 `generateStaticParams` 进行 SSG
- 语言路由由 next-intl 中间件处理

---

## 常见任务

### 添加新技能

1. 编辑 `src/data/skills.ts` - 在 `skills` 数组中添加条目
2. 确保分类在 `src/data/categories.ts` 中存在

### 添加新文档页面

1. 创建 `src/content/docs/my-doc.mdx`（英文）
2. 创建 `src/content/docs/my-doc.zh.mdx`（中文）
3. 添加包含 title、order 和 group 的 frontmatter

### 添加新组件

1. 创建 `src/components/MyComponent.tsx`
2. 如使用 hooks/交互功能，添加 `"use client"` 指令
3. 导出命名函数，定义 props 接口

---

## 部署

生产部署使用 `opennextjs-cloudflare` 部署到 Cloudflare Workers：

```bash
pnpm build:worker && pnpm deploy
```

在 `wrangler.jsonc` 中配置 Cloudflare 设置。

## 限制
这个项目最终是要部署到 cloudflare Worker

1. 不能使用 Worker 不支持的语法