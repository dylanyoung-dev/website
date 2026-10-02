"use client";

import type { Fields, ListRow } from "@amplifyup/sdk/react";
import { BookOpen } from "lucide-react";
import { CardGridSection, ContentCard } from "@/components/amplifyup/internal/ContentCard";
import { plainSlug } from "@/components/amplifyup/internal/fields";

/** Sanity `series` fields used on the card. */
type SeriesRow = {
  title: string;
  slug: string;
  description?: string;
  /** Only the count is used. */
  posts?: { title: string }[];
};

/**
 * AmplifyUP placeable `SeriesList` (/insights/series). Bind `series` to the
 * Sanity `series` Resource. Section copy is baked in (one-off).
 */
export function SeriesList({ fields }: { fields: Fields<{ series: SeriesRow[] }> }) {
  const rows = (fields.series?.value ?? []) as ListRow<SeriesRow>[];

  return (
    <CardGridSection
      heading="All Series"
      description="Multi-part deep dives, read in order"
      isEmpty={rows.length === 0}
      emptyMessage="No series published yet."
      emptyIcon={<BookOpen className="h-8 w-8" aria-hidden />}
    >
      {rows.map((series) => {
        const parts = Array.isArray(series.posts?.value) ? series.posts.value.length : 0;
        return (
          <ContentCard
            key={series.id}
            href={`/insights/series/${plainSlug(series.slug)}/`}
            title={series.title}
            description={series.description}
            eyebrow={parts ? `${parts} ${parts === 1 ? "part" : "parts"}` : "Series"}
            fallbackIcon={<BookOpen className="h-10 w-10" />}
            ctaLabel="Read series"
          />
        );
      })}
    </CardGridSection>
  );
}
