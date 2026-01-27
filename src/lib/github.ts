/**
 * GitHub 文件树项目接口
 */
export interface GitHubTreeItem {
  name: string; // 文件/目录名称
  path: string; // 完整路径
  type: "file" | "dir"; // 类型：文件或目录
  sha: string; // Git SHA 值
  size?: number; // 文件大小（字节）
  download_url?: string | null; // 下载链接
  html_url?: string; // GitHub 页面链接
}

/**
 * 解析后的仓库信息
 */
export interface ParsedRepoInfo {
  owner: string; // 仓库所有者
  repo: string; // 仓库名称
  path: string; // 文件/目录路径
  branch: string; // 分支名
}

/**
 * GitHub 仓库元数据
 */
export interface GitHubRepoMeta {
  stars: number; // Star 数
  forks: number; // Fork 数
  openIssues: number; // 未关闭 issue 数
  watchers: number; // Watch 数
  defaultBranch: string; // 默认分支
  language: string | null; // 主要编程语言
  license: string | null; // 许可证
  updatedAt: string; // 最后更新时间
}

/**
 * 解析 GitHub URL 提取仓库信息
 * @param url GitHub 仓库 URL
 * @returns 解析后的仓库信息或 null
 */
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

/**
 * 获取 GitHub 仓库目录内容
 * @param owner 仓库所有者
 * @param repo 仓库名称
 * @param path 目录路径，默认为根目录
 * @param branch 分支名，默认 main
 * @param token GitHub Token（可选）
 * @returns 文件树项目列表
 */
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
    // 404 错误时尝试使用 master 分支
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

/**
 * 获取 GitHub 文件内容
 * @param owner 仓库所有者
 * @param repo 仓库名称
 * @param path 文件路径
 * @param branch 分支名，默认 main
 * @param token GitHub Token（可选）
 * @returns 文件内容文本
 */
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
    // 404 错误时尝试使用 master 分支
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

/**
 * 获取文件扩展名
 * @param filename 文件名
 * @returns 文件扩展名（小写）
 */
export function getFileExtension(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return ext;
}

/**
 * 根据文件扩展名获取编程语言
 * @param ext 文件扩展名
 * @returns 语言标识符（用于语法高亮）
 */
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

/**
 * 对文件树项目排序（目录优先，然后按名称字母顺序）
 * @param items 文件树项目列表
 * @returns 排序后的项目列表
 */
export function sortTreeItems(items: GitHubTreeItem[]): GitHubTreeItem[] {
  return [...items].sort((a, b) => {
    if (a.type === "dir" && b.type === "file") return -1;
    if (a.type === "file" && b.type === "dir") return 1;
    return a.name.localeCompare(b.name);
  });
}

/**
 * 获取 GitHub 仓库元数据
 * @param owner 仓库所有者
 * @param repo 仓库名称
 * @param token GitHub Token（可选）
 * @returns 仓库元数据
 */
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
