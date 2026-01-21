import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock, InlineCode } from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <article
      className={`prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:before:content-none prose-code:after:content-none ${className}`}
    >
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
              {children}
            </h1>
          ),
          h2: ({ children, id }) => (
            <h2 id={id} className="text-2xl font-semibold mt-10 mb-4 text-zinc-800 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children, id }) => (
            <h3 id={id} className="text-xl font-semibold mt-8 mb-3 text-zinc-800 dark:text-zinc-200">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-base leading-7 mb-4 text-zinc-600 dark:text-zinc-400">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href ?? "#"}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-6 mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="text-base leading-7 pl-1">{children}</li>,
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-100">
              {children}
            </strong>
          ),
          pre: ({ children }) => (
            <pre className="bg-zinc-900 dark:bg-zinc-950 text-zinc-100 rounded-lg p-4 overflow-x-auto my-4 text-sm leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ children, className }) => {
            // 如果有 className（代码块内的 code），使用客户端高亮组件
            if (className) {
              return <CodeBlock className={className}>{children}</CodeBlock>;
            }
            // 内联代码
            return <InlineCode>{children}</InlineCode>;
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-6 bg-blue-50 dark:bg-blue-900/20 py-3 pr-4 rounded-r-lg">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </Markdown>
    </article>
  );
}
