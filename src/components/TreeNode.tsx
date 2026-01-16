"use client";

import { useState } from "react";
import type { GitHubTreeItem } from "@/lib/github";
import { getFileExtension } from "@/lib/github";

interface TreeNodeProps {
  item: GitHubTreeItem;
  level: number;
  onSelect: (item: GitHubTreeItem) => void;
  onExpand: (item: GitHubTreeItem) => Promise<GitHubTreeItem[]>;
  selectedPath?: string;
}

const fileIconMap: Record<string, string> = {
  md: "📝",
  mdx: "📝",
  ts: "🔷",
  tsx: "⚛️",
  js: "🟨",
  jsx: "⚛️",
  json: "📋",
  yaml: "⚙️",
  yml: "⚙️",
  py: "🐍",
  sh: "🖥️",
  bash: "🖥️",
  css: "🎨",
  html: "🌐",
  svg: "🖼️",
  png: "🖼️",
  jpg: "🖼️",
  gif: "🖼️",
};

function getFileIcon(filename: string, type: "file" | "dir"): string {
  if (type === "dir") return "📁";
  const ext = getFileExtension(filename);
  return fileIconMap[ext] || "📄";
}

export function TreeNode({
  item,
  level,
  onSelect,
  onExpand,
  selectedPath,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState<GitHubTreeItem[]>([]);

  const handleClick = async () => {
    if (item.type === "dir") {
      if (!isExpanded && children.length === 0) {
        setIsLoading(true);
        try {
          const items = await onExpand(item);
          setChildren(items);
        } catch (error) {
          console.error("Failed to expand directory:", error);
        }
        setIsLoading(false);
      }
      setIsExpanded(!isExpanded);
    } else {
      onSelect(item);
    }
  };

  const isSelected = selectedPath === item.path;

  return (
    <div>
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-2 px-3 py-1.5 text-left text-sm rounded-lg transition-colors ${
          isSelected
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        {item.type === "dir" && (
          <span
            className={`text-xs text-zinc-400 transition-transform ${
              isExpanded ? "rotate-90" : ""
            }`}
          >
            ▶
          </span>
        )}
        <span className="flex-shrink-0">
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-zinc-300 border-t-blue-500 rounded-full animate-spin" />
          ) : (
            getFileIcon(item.name, item.type)
          )}
        </span>
        <span className="truncate">{item.name}</span>
        {item.type === "file" && item.size && (
          <span className="ml-auto text-xs text-zinc-400 flex-shrink-0">
            {formatFileSize(item.size)}
          </span>
        )}
      </button>

      {isExpanded && children.length > 0 && (
        <div>
          {children.map((child) => (
            <TreeNode
              key={child.path}
              item={child}
              level={level + 1}
              onSelect={onSelect}
              onExpand={onExpand}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
