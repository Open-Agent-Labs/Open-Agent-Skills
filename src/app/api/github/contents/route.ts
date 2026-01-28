import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { successResponse, errorResponse, ErrorCode } from "@/lib/api-response";
import { startApiLog, endApiLog, logError } from "@/lib/logger";

/**
 * 获取 GitHub 仓库目录内容 API
 * 返回文件和目录列表
 */
export async function GET(request: NextRequest) {
  const startTime = await startApiLog(request);
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") || "";
  const branch = searchParams.get("branch") || "main";

  if (!owner || !repo) {
    const errorData = { code: ErrorCode.BAD_REQUEST, data: null, message: "Missing owner or repo parameter" };
    endApiLog(request, startTime, 200, errorData, { reason: "Missing parameters" });
    return errorResponse("Missing owner or repo parameter", ErrorCode.BAD_REQUEST);
  }

  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${
    branch ? `?ref=${branch}` : ""
  }`;

  // 设置请求头
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Open-Agent-Skills",
  };

  // 优先使用 Cloudflare 环境变量中的 Token
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
    let response = await fetch(url, { headers, next: { revalidate: 3600 } });

    // 404 错误时尝试使用 master 分支
    if (!response.ok && response.status === 404) {
      const masterUrl = url.replace(`ref=${branch}`, "ref=master");
      response = await fetch(masterUrl, { headers, next: { revalidate: 3600 } });
    }

    if (!response.ok) {
      const errorData = { code: ErrorCode.BAD_GATEWAY, data: null, message: `GitHub API error: ${response.status}` };
      endApiLog(request, startTime, 200, errorData, { owner, repo, path, branch });
      return errorResponse(
        `GitHub API error: ${response.status}`,
        ErrorCode.BAD_GATEWAY
      );
    }

    const data = await response.json();
    const resultCount = Array.isArray(data) ? data.length : 1;
    const result = Array.isArray(data) ? data : [data];
    const responseData = { code: 0, data: result, message: "GitHub contents fetched successfully" };
    endApiLog(request, startTime, 200, responseData, { owner, repo, path, branch, count: resultCount });
    return successResponse(result, "GitHub contents fetched successfully");
  } catch (error) {
    logError(request, error, { owner, repo, path, branch });
    const errorData = { code: ErrorCode.INTERNAL_ERROR, data: null, message: "Failed to fetch from GitHub" };
    endApiLog(request, startTime, 200, errorData);
    return errorResponse("Failed to fetch from GitHub", ErrorCode.INTERNAL_ERROR);
  }
}
