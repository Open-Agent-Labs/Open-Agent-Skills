import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * 获取 GitHub 仓库目录内容 API
 * 返回文件和目录列表
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") || "";
  const branch = searchParams.get("branch") || "main";

  if (!owner || !repo) {
    return NextResponse.json(
      { error: "Missing owner or repo parameter" },
      { status: 400 }
    );
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
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    // 确保返回数组格式
    return NextResponse.json(Array.isArray(data) ? data : [data]);
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GitHub" },
      { status: 500 }
    );
  }
}
