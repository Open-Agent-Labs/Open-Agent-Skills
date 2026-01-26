export interface GitHubTreeItem {
  name: string;
  path: string;
  type: "file" | "dir";
  sha: string;
  size?: number;
  download_url?: string | null;
  html_url?: string;
}

export interface ParsedRepoInfo {
  owner: string;
  repo: string;
  path: string;
  branch: string;
}

export interface GitHubRepoMeta {
  stars: number;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
  language: string | null;
  license: string | null;
  updatedAt: string;
}

export function parseGitHubUrl(url: string): ParsedRepoInfo | null {
  try {
    const urlObj = new URL(url);
    if (!urlObj.hostname.includes("github.com")) return null;

    const parts = urlObj.pathname.split("/").filter(Boolean);
    if (parts.length < 2) return null;

    const owner = parts[0];
    const repo = parts[1];

    let branch = "main";
    let path = "";

    if (parts[2] === "tree" && parts.length > 3) {
      branch = parts[3];
      path = parts.slice(4).join("/");
    } else if (parts[2] === "blob" && parts.length > 3) {
      branch = parts[3];
      path = parts.slice(4).join("/");
    } else if (parts.length > 2) {
      path = parts.slice(2).join("/");
    }

    path = path.replace(/\/+$/, "");

    return { owner, repo, path, branch };
  } catch {
    return null;
  }
}

export async function fetchRepoContents(
  owner: string,
  repo: string,
  path: string = "",
  branch: string = "main",
  token?: string
): Promise<GitHubTreeItem[]> {
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}${
    branch ? `?ref=${branch}` : ""
  }`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });

  if (!response.ok) {
    if (response.status === 404) {
      const masterUrl = url.replace(`ref=${branch}`, "ref=master");
      const masterResponse = await fetch(masterUrl, {
        headers,
        next: { revalidate: 3600 },
      });
      if (masterResponse.ok) {
        const data = await masterResponse.json();
        return Array.isArray(data) ? data : [data];
      }
    }
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}

export async function fetchFileContent(
  owner: string,
  repo: string,
  path: string,
  branch: string = "main",
  token?: string
): Promise<string> {
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

  const headers: HeadersInit = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers, next: { revalidate: 3600 } });

  if (!response.ok) {
    if (response.status === 404) {
      const masterUrl = url.replace(`/${branch}/`, "/master/");
      const masterResponse = await fetch(masterUrl, {
        headers,
        next: { revalidate: 3600 },
      });
      if (masterResponse.ok) {
        return masterResponse.text();
      }
    }
    throw new Error(`Failed to fetch file: ${response.status}`);
  }

  return response.text();
}

export function getFileExtension(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return ext;
}

export function getLanguageFromExtension(ext: string): string {
  const languageMap: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    py: "python",
    rb: "ruby",
    go: "go",
    rs: "rust",
    java: "java",
    kt: "kotlin",
    swift: "swift",
    c: "c",
    cpp: "cpp",
    h: "c",
    hpp: "cpp",
    cs: "csharp",
    php: "php",
    sh: "bash",
    bash: "bash",
    zsh: "bash",
    json: "json",
    yaml: "yaml",
    yml: "yaml",
    toml: "toml",
    xml: "xml",
    html: "html",
    css: "css",
    scss: "scss",
    less: "less",
    md: "markdown",
    mdx: "mdx",
    sql: "sql",
    graphql: "graphql",
    dockerfile: "dockerfile",
    makefile: "makefile",
  };

  return languageMap[ext] || "text";
}

export function sortTreeItems(items: GitHubTreeItem[]): GitHubTreeItem[] {
  return [...items].sort((a, b) => {
    if (a.type === "dir" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function fetchRepoMeta(owner: string, repo: string, token?: string): Promise<GitHubRepoMeta> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "Open-Agent-Skills",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(apiUrl, {
    headers,
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    stars: data.stargazers_count || 0,
    forks: data.forks_count || 0,
    openIssues: data.open_issues_count || 0,
    watchers: data.watchers_count || 0,
    defaultBranch: data.default_branch || "main",
    language: data.language || null,
    license: data.license?.name || null,
    updatedAt: data.updated_at || data.pushed_at || "",
  };
}
