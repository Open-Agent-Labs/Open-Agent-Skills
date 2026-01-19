import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import type { Options as PrettyCodeOptions } from "rehype-pretty-code";
import { useMDXComponents } from "../../mdx-components";

const prettyCodeOptions: PrettyCodeOptions = {
  theme: "github-dark",
  keepBackground: true,
};

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export async function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  const components = useMDXComponents({});

  return (
    <article
      className={`prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:before:content-none prose-code:after:content-none ${className}`}
    >
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </article>
  );
}
