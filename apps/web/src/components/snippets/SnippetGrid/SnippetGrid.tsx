import { Braces } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ISnippet } from "@/interfaces/ISnippet";
import { SnippetCard } from "../SnippetCard/SnippetCard";

interface SnippetGridProps {
  snippets: ISnippet[];
  title?: string;
  description?: string;
  sortLabel?: string;
  emptyMessage?: string;
}

export function SnippetGrid({
  snippets,
  title = "All Snippets",
  description = "Copy-paste recipes, scripts, and config snippets",
  sortLabel = "Sorted by newest",
  emptyMessage = "No snippets published yet.",
}: SnippetGridProps) {
  if (snippets.length === 0) {
    return (
      <Card className="border-border/80">
        <CardContent className="py-12 text-center">
          <Braces className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {sortLabel ? (
          <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
            {sortLabel}
          </span>
        ) : null}
      </div>

      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet._id} snippet={snippet} />
        ))}
      </div>
    </section>
  );
}
