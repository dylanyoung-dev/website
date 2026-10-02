"use client";

import { Suspense } from "react";
import type { Fields, ListRow, QueryPagination } from "@amplifyup/sdk/react";
import { Braces } from "lucide-react";
import { CardGridSection, ContentCard } from "@/components/amplifyup/internal/ContentCard";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { LoadMoreButton } from "@/components/amplifyup/internal/LoadMoreButton";
import { usePagedRows } from "@/components/amplifyup/internal/usePagedRows";
import { getSnippetLanguage } from "@/lib/snippet-preview";

/** Sanity `snippet` fields used on the card. */
type SnippetRow = {
  title: string;
  slug: string;
  excerpt?: string;
  /** Markdown; only used to detect the code language. */
  body?: string;
};

type SnippetGridProps = {
  fields: Fields<{ snippets: SnippetRow[] }>;
  /** Present when the `snippets` connection is marked paginated in Composer. */
  snippetsPagination?: QueryPagination;
};

function SnippetGridInner({ fields, snippetsPagination }: SnippetGridProps) {
  const initial = (fields.snippets?.value ?? []) as ListRow<SnippetRow>[];
  const { rows, hasMore, loadingMore, loadMore } = usePagedRows(initial, snippetsPagination);

  return (
    <CardGridSection
      heading="All Snippets"
      description="Copy-paste recipes, scripts, and config snippets"
      isEmpty={rows.length === 0}
      emptyMessage="No snippets published yet."
      emptyIcon={<Braces className="h-8 w-8" aria-hidden />}
      footer={<LoadMoreButton show={hasMore} loading={loadingMore} onClick={loadMore} />}
    >
      {rows.map((snippet) => {
        const language = getSnippetLanguage({ body: snippet.body?.value ?? undefined });
        return (
          <ContentCard
            key={snippet.id}
            href={`/snippets/${plainSlug(snippet.slug)}/`}
            title={snippet.title}
            description={snippet.excerpt}
            eyebrow={language?.toUpperCase() || "Snippet"}
            fallbackIcon={<Braces className="h-10 w-10" />}
            ctaLabel="View snippet"
          />
        );
      })}
    </CardGridSection>
  );
}

/**
 * AmplifyUP placeable `SnippetGrid` (/snippets). Bind `snippets` to the
 * Sanity `snippet` Resource.
 */
export function SnippetGrid(props: SnippetGridProps) {
  return (
    <Suspense fallback={null}>
      <SnippetGridInner {...props} />
    </Suspense>
  );
}
