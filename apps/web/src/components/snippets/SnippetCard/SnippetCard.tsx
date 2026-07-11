import Link from "next/link";
import { ArrowRight, Braces } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ISnippet } from "@/interfaces/ISnippet";
import {
  getSnippetFilename,
  getSnippetLanguage,
  getSnippetPreviewText,
} from "@/lib/snippet-preview";
import { formatPublishedDate } from "@/lib/utils";

interface SnippetCardProps {
  snippet: ISnippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const language = getSnippetLanguage(snippet);
  const preview = getSnippetPreviewText(snippet);
  const publishedLabel = formatPublishedDate(snippet.publishedAt, "MMM dd, yyyy");
  const filename = getSnippetFilename(snippet.title, language);
  const tags = snippet.tagging?.map((tag) => tag.title).filter(Boolean) ?? [];
  const categories = snippet.categories?.map((category) => category.title).filter(Boolean) ?? [];
  const metaLabel = categories[0] ?? tags[0] ?? language?.toUpperCase() ?? "Snippet";

  return (
    <Card className="group overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="p-0">
        <Link
          href={`/snippets/${snippet.slug.current}/`}
          className="flex flex-col no-underline"
        >
          <div className="flex items-center justify-between gap-3 border-b border-border/80 bg-muted/40 px-4 py-3">
            <div className="min-w-0 space-y-1">
              <p className="truncate font-mono text-xs text-muted-foreground">
                {filename}
              </p>
              <h3 className="truncate text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                {snippet.title}
              </h3>
            </div>
            <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
              {metaLabel}
            </span>
          </div>

          <div className="relative bg-slate-950 px-4 py-4 text-slate-100">
            <pre className="overflow-hidden font-mono text-xs leading-6 md:text-sm">
              <code className="block whitespace-pre-wrap break-words">
                {preview || "Open to view this snippet."}
              </code>
            </pre>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-950 to-transparent"
              aria-hidden
            />
          </div>

          <div className="flex items-center justify-between gap-4 border-t px-4 py-3.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            <div className="flex min-w-0 items-center gap-2">
              <Braces className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {publishedLabel ? (
                <time dateTime={String(snippet.publishedAt)}>{publishedLabel}</time>
              ) : (
                <span>Snippet</span>
              )}
            </div>
            <span className="inline-flex items-center gap-1">
              View Code
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
