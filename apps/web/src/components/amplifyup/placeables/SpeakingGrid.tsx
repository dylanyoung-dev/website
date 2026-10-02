"use client";

import { Suspense } from "react";
import type { Fields, ImageValue, ListRow, QueryPagination } from "@amplifyup/sdk/react";
import { Mic } from "lucide-react";
import { CardGridSection, ContentCard } from "@/components/amplifyup/internal/ContentCard";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { LoadMoreButton } from "@/components/amplifyup/internal/LoadMoreButton";
import { usePagedRows } from "@/components/amplifyup/internal/usePagedRows";

/** Sanity `speaking` fields used on the card. */
type Session = {
  title: string;
  slug: string;
  thumbnail?: ImageValue;
  short_description?: string;
  location?: string;
};

type SpeakingGridProps = {
  fields: Fields<{ sessions: Session[] }>;
  /** Present when the `sessions` connection is marked paginated in Composer. */
  sessionsPagination?: QueryPagination;
};

function SpeakingGridInner({ fields, sessionsPagination }: SpeakingGridProps) {
  const initial = (fields.sessions?.value ?? []) as ListRow<Session>[];
  const { rows, hasMore, loadingMore, loadMore } = usePagedRows(initial, sessionsPagination);

  return (
    <CardGridSection
      heading="All Sessions"
      description="Event pages with slides, recordings, and curated resources"
      isEmpty={rows.length === 0}
      emptyMessage="No speaking engagements available yet."
      emptyIcon={<Mic className="h-8 w-8" aria-hidden />}
      footer={<LoadMoreButton show={hasMore} loading={loadingMore} onClick={loadMore} />}
    >
      {rows.map((session) => (
        <ContentCard
          key={session.id}
          href={`/speaking/${plainSlug(session.slug)}/`}
          title={session.title}
          description={session.short_description}
          image={session.thumbnail}
          eyebrow={session.location?.value || "Speaking"}
          fallbackIcon={<Mic className="h-10 w-10" />}
          ctaLabel="View session"
        />
      ))}
    </CardGridSection>
  );
}

/**
 * AmplifyUP placeable `SpeakingGrid` (/speaking). Bind `sessions` to the
 * Sanity `speaking` Resource. Section copy is baked in (one-off).
 */
export function SpeakingGrid(props: SpeakingGridProps) {
  return (
    <Suspense fallback={null}>
      <SpeakingGridInner {...props} />
    </Suspense>
  );
}
