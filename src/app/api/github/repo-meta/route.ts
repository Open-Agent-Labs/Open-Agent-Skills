import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { parseGitHubUrl } from "@/lib/github";
import { successResponse, errorResponse, ErrorCode } from "@/lib/api-response";
import { startApiLog, endApiLog, logError } from "@/lib/logger";

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
  const startTime = await startApiLog(request);
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
      endApiLog(request, startTime, 200, { reason: "Invalid URL", url });
      return errorResponse("Invalid GitHub URL", ErrorCode.BAD_REQUEST);
    }
    repoOwner = parsed.owner;
    repoName = parsed.repo;
  }

  if (!repoOwner || !repoName) {
    endApiLog(request, startTime, 200, { reason: "Missing parameters" });
    return errorResponse("Missing owner or repo parameter", ErrorCode.BAD_REQUEST);
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
      endApiLog(request, startTime, 200, { owner: repoOwner, repo: repoName });
      return errorResponse(
        `GitHub API error: ${response.status}`,
        ErrorCode.BAD_GATEWAY
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

    endApiLog(request, startTime, 200, { owner: repoOwner, repo: repoName, stars: meta.stars });
    return successResponse(meta, "Repository metadata fetched successfully");
  } catch (error) {
    logError(request, error, { owner: repoOwner, repo: repoName });
    endApiLog(request, startTime, 200);
    return errorResponse(
      "Failed to fetch repository metadata from GitHub",
      ErrorCode.INTERNAL_ERROR
    );
  }
}
