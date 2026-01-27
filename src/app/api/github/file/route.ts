import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * 获取 GitHub 文件内容 API
 * 直接从 raw.githubusercontent.com 获取文件内容
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");
  const path = searchParams.get("path") || "";
  const branch = searchParams.get("branch") || "main";

  if (!owner || !repo || !path) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

  // 设置请求头
  const headers: HeadersInit = {
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
      const masterUrl = url.replace(`/${branch}/`, "/master/");
      response = await fetch(masterUrl, { headers, next: { revalidate: 3600 } });
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch file: ${response.status}` },
        { status: response.status }
      );
    }

    const content = await response.text();
    // 返回纯文本内容
    return new NextResponse(content, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (error) {
    console.error("GitHub file fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch file from GitHub" },
      { status: 500 }
    );
  }
}
