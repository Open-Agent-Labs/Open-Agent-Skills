import { NextRequest, NextResponse } from "next/server";

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

  const headers: HeadersInit = {
    "User-Agent": "Open-Agent-Skills",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    let response = await fetch(url, { headers, next: { revalidate: 3600 } });

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
