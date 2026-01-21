"use client";

import { useEffect, useRef } from "react";
import hljs from "highlight.js/lib/core";
// 按需导入常用语言
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import python from "highlight.js/lib/languages/python";
import yaml from "highlight.js/lib/languages/yaml";
import shell from "highlight.js/lib/languages/shell";

// 注册语言
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("md", markdown);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("python", python);
hljs.registerLanguage("py", python);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("yml", yaml);

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  
  // 从 className 中提取语言（如 "language-typescript"）
  const language = className?.replace(/language-/, "") || "";

  useEffect(() => {
    if (codeRef.current && language) {
      // 重置高亮状态后重新高亮
      codeRef.current.removeAttribute("data-highlighted");
      hljs.highlightElement(codeRef.current);
    }
  }, [children, language]);

  return (
    <code ref={codeRef} className={className}>
      {children}
    </code>
  );
}

// 内联代码组件（不需要高亮）
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  );
}
