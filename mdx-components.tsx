import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3 text-zinc-800 dark:text-zinc-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium mt-4 mb-2 text-zinc-800 dark:text-zinc-200">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-lg leading-7 mb-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
      >
        {children}
      </Link>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-zinc-600 dark:text-zinc-400">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="text-lg leading-7">{children}</li>,
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-900 dark:bg-zinc-950 p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
    ...components,
  };
}
