import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    h4: ({ children, id }) => (
      <h4 id={id} className="text-lg font-semibold mt-6 mb-2 text-zinc-800 dark:text-zinc-200">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="text-base leading-7 mb-4 text-zinc-600 dark:text-zinc-400">
        {children}
      </p>
    ),
    a: ({ href, children }) => (
      <Link
        href={href ?? "#"}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2"
      >
        {children}
      </Link>
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
    code: ({ children }) => (
      <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-zinc-800 dark:text-zinc-200">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-zinc-900 dark:bg-zinc-950 p-4 rounded-lg overflow-x-auto mb-6 text-sm border border-zinc-800">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-6 bg-blue-50 dark:bg-blue-900/20 py-3 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-8 border-zinc-200 dark:border-zinc-800" />,
    table: ({ children }) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-lg">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-zinc-50 dark:bg-zinc-800/50">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-900">
        {children}
      </tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
        {children}
      </tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </td>
    ),
    ...components,
  };
}
