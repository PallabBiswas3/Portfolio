import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import { headingId } from "@/lib/writing";
import "katex/dist/katex.min.css";

// Rendered on the server. Raw HTML is intentionally not enabled.
export function TechnicalMarkdown({ children }: { children: string }) {
  return <div className="markdown-content"><Markdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex, rehypeHighlight]} components={{ h2: ({ children, ...props }) => <h2 id={headingId(String(children))} {...props}>{children}</h2> }}>{children}</Markdown></div>;
}
