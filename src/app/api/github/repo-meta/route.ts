import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { parseGitHubUrl } from "@/lib/github";

export const runtime = "edge";

/**
 * GitHub 仓库元数据接口
 */
interface GitHubRepoMeta {
  stars: number; // Star 数
  forks: number; // Fork 数
  openIssues: number; // 未关闭 Issue 数
  watchers: number; // Watch 数
  defaultBranch: string; // 默认分支
  language: string | null; // 主要语言
  license: string | null; // 许可证
  updatedAt: string; // 最后更新时间
}

/**
 * 获取 GitHub 仓库元数据 API
 * 支持通过 URL 或 owner/repo 参数查询
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  let repoOwner = owner;
  let repoName = repo;

  // 如果提供了 URL，解析出 owner 和 repo
  if (url && !owner && !repo) {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: "Invalid GitHub URL" },
        { status: 400 }
      );
    }
    repoOwner = parsed.owner;
    repoName = parsed.repo;
  }

  if (!repoOwner || !repoName) {
    return NextResponse.json(
      { error: "Missing owner or repo parameter" },
      { status: 400 }
    );
  }

  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}`;

  // 设置请求头
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Open-Agent-Skills",
  };

  // 优先使用 Cloudflare 环境变量中的 Token，否则使用 process.env
  let token = process.env.GITHUB_TOKEN;
  try {
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    if (env.GITHUB_TOKEN) {
      token = env.GITHUB_TOKEN;
    }
  } catch (e) {
    // 回退到 process.env
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 300 }, // 缓存 5 分钟
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 构建返回的元数据对象
    const meta: GitHubRepoMeta = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      openIssues: data.open_issues_count || 0,
      watchers: data.watchers_count || 0,
      defaultBranch: data.default_branch || "main",
      language: data.language || null,
      license: data.license?.name || null,
      updatedAt: data.updated_at || data.pushed_at || "",
    };

    return NextResponse.json(meta, {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("GitHub repo meta fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch repository metadata from GitHub" },
      { status: 500 }
    );
  }
}
