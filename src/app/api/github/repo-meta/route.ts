import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { parseGitHubUrl } from "@/lib/github";

export const runtime = "edge";

interface GitHubRepoMeta {
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
  language: string | null;
  license: string | null;
  updatedAt: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  let repoOwner = owner;
  let repoName = repo;

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

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Open-Agent-Skills",
  };

  let token = process.env.GITHUB_TOKEN;
  try {
    const context = getCloudflareContext();
    const env = context.env as Record<string, any>;
    if (env.GITHUB_TOKEN) {
      token = env.GITHUB_TOKEN;
    }
  } catch (e) {
    // Fallback to process.env
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(apiUrl, {
      headers,
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

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
