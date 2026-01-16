"use client";

import { getFileExtension, getLanguageFromExtension } from "@/lib/github";

interface FileViewerProps {
  filename: string;
  content: string;
  githubUrl?: string;
  onClose: () => void;
  locale: string;
}

export function FileViewer({
  filename,
  content,
  githubUrl,
  onClose,
  locale,
}: FileViewerProps) {
  const ext = getFileExtension(filename);
  const language = getLanguageFromExtension(ext);
  const isZh = locale === "zh";

  const lines = content.split("\n");
  const isImage = ["png", "jpg", "jpeg", "gif", "svg", "webp", "ico"].includes(ext);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-zinc-900 dark:text-white">
            {filename}
          </span>
          <span className="px-2 py-0.5 text-xs bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded">
            {language}
          </span>
          <span className="text-xs text-zinc-500">
            {lines.length} {isZh ? "行" : "lines"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              title={isZh ? "在 GitHub 查看" : "View on GitHub"}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            title={isZh ? "关闭" : "Close"}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-h-[500px] overflow-auto">
        {isImage ? (
          <div className="p-8 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              {isZh ? "图片预览不支持，请在 GitHub 查看" : "Image preview not supported, view on GitHub"}
            </p>
          </div>
        ) : (
          <div className="relative">
            <pre className="p-4 text-sm leading-relaxed overflow-x-auto bg-zinc-950 text-zinc-300">
              <code>
                {lines.map((line, index) => (
                  <div key={index} className="flex">
                    <span className="select-none text-zinc-600 w-12 text-right pr-4 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="flex-1 whitespace-pre">{line || " "}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
