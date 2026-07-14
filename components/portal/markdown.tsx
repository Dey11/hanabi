import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Renders trusted, admin-authored markdown with a tuned typographic scale.
 * Kept monochrome and minimal to match the Hanabi brand.
 */
export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "text-foreground/90 text-[0.94rem] leading-7",
        // headings
        "[&_h1]:mt-0 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:tracking-tight",
        "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight",
        "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold",
        // flow
        "[&_p]:my-4 [&_p]:leading-7",
        "[&_a]:decoration-border hover:[&_a]:decoration-foreground [&_a]:font-medium [&_a]:underline [&_a]:underline-offset-4",
        "[&_strong]:font-semibold",
        // lists
        "[&_ul]:marker:text-muted-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5",
        "[&_ol]:marker:text-muted-foreground [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5",
        "[&_li]:my-1.5 [&_li]:pl-1",
        // quote
        "[&_blockquote]:border-border [&_blockquote]:text-muted-foreground [&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:pl-4 [&_blockquote]:italic",
        // inline + block code
        "[&_code]:bg-muted [&_code]:rounded-md [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.82em]",
        "[&_pre]:bg-muted/50 [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:p-4 [&_pre]:text-[0.82rem] [&_pre]:leading-6",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
        // rules + tables
        "[&_hr]:border-border [&_hr]:my-8",
        "[&_table]:my-5 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[0.86rem]",
        "[&_th]:border-border [&_th]:bg-muted/50 [&_th]:border [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium",
        "[&_td]:border-border [&_td]:border [&_td]:px-3 [&_td]:py-2",
        "[&_img]:my-5 [&_img]:rounded-xl [&_img]:border",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </div>
  );
}
