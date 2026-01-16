"use client";

import { useState, useEffect } from "react";
import {
  parseGitHubUrl,
  sortTreeItems,
  type GitHubTreeItem,
  type ParsedRepoInfo,
} from "@/lib/github";
import { TreeNode } from "./TreeNode";
import { FileViewer } from "./FileViewer";

interface GitHubRepoTreeProps {
  repositoryUrl: string;
  locale: string;
}

async function fetchContentsViaAPI(
  owner: string,
  repo: string,
  path: string,
  branch: string
): Promise<GitHubTreeItem[]> {
  const params = new URLSearchParams({ owner, repo, path, branch });
  const response = await fetch(`/api/github/contents?${params}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

async function fetchFileViaAPI(
  owner: string,
  repo: string,
  path: string,
  branch: string
): Promise<string> {
  const params = new URLSearchParams({ owner, repo, path, branch });
  const response = await fetch(`/api/github/file?${params}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.text();
}

export function GitHubRepoTree({ repositoryUrl, locale }: GitHubRepoTreeProps) {
  const [repoInfo, setRepoInfo] = useState<ParsedRepoInfo | null>(null);
  const [rootItems, setRootItems] = useState<GitHubTreeItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<GitHubTreeItem | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingFile, setIsLoadingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isZh = locale === "zh";

  useEffect(() => {
    const info = parseGitHubUrl(repositoryUrl);
    if (!info) {
      setError(isZh ? "无法解析仓库 URL" : "Unable to parse repository URL");
      setIsLoading(false);
      return;
    }

    setRepoInfo(info);
    loadRootContents(info);
  }, [repositoryUrl, isZh]);

  const loadRootContents = async (info: ParsedRepoInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      const items = await fetchContentsViaAPI(
        info.owner,
        info.repo,
        info.path,
        info.branch
      );
      setRootItems(sortTreeItems(items));
    } catch (err) {
      setError(
        isZh
          ? "加载仓库内容失败，请稍后重试"
          : "Failed to load repository contents"
      );
      console.error(err);
    }

    setIsLoading(false);
  };

  const handleExpand = async (item: GitHubTreeItem): Promise<GitHubTreeItem[]> => {
    if (!repoInfo) return [];

    try {
      const items = await fetchContentsViaAPI(
        repoInfo.owner,
        repoInfo.repo,
        item.path,
        repoInfo.branch
      );
      return sortTreeItems(items);
    } catch (err) {
      console.error("Failed to expand directory:", err);
      return [];
    }
  };

  const handleSelectFile = async (item: GitHubTreeItem) => {
    if (!repoInfo) return;

    setSelectedFile(item);
    setIsLoadingFile(true);

    try {
      const content = await fetchFileViaAPI(
        repoInfo.owner,
        repoInfo.repo,
        item.path,
        repoInfo.branch
      );
      setFileContent(content);
    } catch (err) {
      setFileContent(
        isZh ? "// 无法加载文件内容" : "// Failed to load file content"
      );
      console.error(err);
    }

    setIsLoadingFile(false);
  };

  const handleCloseViewer = () => {
    setSelectedFile(null);
    setFileContent("");
  };

  const getGitHubFileUrl = (path: string): string => {
    if (!repoInfo) return repositoryUrl;
    return `https://github.com/${repoInfo.owner}/${repoInfo.repo}/blob/${repoInfo.branch}/${path}`;
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin" />
          <span className="text-zinc-600 dark:text-zinc-400">
            {isZh ? "加载仓库内容..." : "Loading repository..."}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
        <div className="flex items-center gap-3 text-red-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isZh ? "在 GitHub 上查看" : "View on GitHub"} →
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {isZh ? "仓库文件" : "Repository Files"}
          </span>
          {repoInfo && (
            <span className="text-xs text-zinc-500">
              {repoInfo.owner}/{repoInfo.repo}
              {repoInfo.path && ` / ${repoInfo.path}`}
            </span>
          )}
        </div>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isZh ? "在 GitHub 查看" : "View on GitHub"} ↗
        </a>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-700">
        <div className="p-2 max-h-[400px] overflow-auto">
          {rootItems.length === 0 ? (
            <div className="p-4 text-center text-zinc-500 dark:text-zinc-400 text-sm">
              {isZh ? "没有找到文件" : "No files found"}
            </div>
          ) : (
            rootItems.map((item) => (
              <TreeNode
                key={item.path}
                item={item}
                level={0}
                onSelect={handleSelectFile}
                onExpand={handleExpand}
                selectedPath={selectedFile?.path}
              />
            ))
          )}
        </div>

        <div className="min-h-[200px] md:min-h-0">
          {selectedFile ? (
            isLoadingFile ? (
              <div className="h-full flex items-center justify-center p-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin" />
                  <span className="text-zinc-600 dark:text-zinc-400 text-sm">
                    {isZh ? "加载文件..." : "Loading file..."}
                  </span>
                </div>
              </div>
            ) : (
              <FileViewer
                filename={selectedFile.name}
                content={fileContent}
                githubUrl={getGitHubFileUrl(selectedFile.path)}
                onClose={handleCloseViewer}
                locale={locale}
              />
            )
          ) : (
            <div className="h-full flex items-center justify-center p-8 text-zinc-400 dark:text-zinc-500 text-sm">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>{isZh ? "选择文件查看内容" : "Select a file to view"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
