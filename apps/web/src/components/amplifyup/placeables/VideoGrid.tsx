"use client";

import { Suspense } from "react";
import type { Fields, ImageValue, ListRow, QueryPagination } from "@amplifyup/sdk/react";
import { Video } from "lucide-react";
import { CardGridSection, ContentCard } from "@/components/amplifyup/internal/ContentCard";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { LoadMoreButton } from "@/components/amplifyup/internal/LoadMoreButton";
import { usePagedRows } from "@/components/amplifyup/internal/usePagedRows";
import { formatPublishedDate } from "@/lib/utils";

/** Sanity `videoPost` fields used on the card. */
type VideoRow = {
  title: string;
  slug: string;
  landscapeImage?: ImageValue;
  summary?: string;
  dateReleased?: string;
};

type VideoGridProps = {
  fields: Fields<{ videos: VideoRow[] }>;
  /** Present when the `videos` connection is marked paginated in Composer. */
  videosPagination?: QueryPagination;
};

function VideoGridInner({ fields, videosPagination }: VideoGridProps) {
  const initial = (fields.videos?.value ?? []) as ListRow<VideoRow>[];
  const { rows, query, searching, hasMore, loadingMore, loadMore } = usePagedRows(
    initial,
    videosPagination,
    "title"
  );

  return (
    <CardGridSection
      heading={query ? `Results for "${query}"` : "All Videos"}
      description="Talks, tutorials, and demos across YouTube channels"
      isEmpty={!searching && rows.length === 0}
      emptyMessage={query ? "No videos match your search." : "No videos available yet."}
      emptyIcon={<Video className="h-8 w-8" aria-hidden />}
      footer={<LoadMoreButton show={hasMore} loading={loadingMore} onClick={loadMore} />}
    >
      {rows.map((video) => (
        <ContentCard
          key={video.id}
          href={`/videos/${plainSlug(video.slug)}/`}
          title={video.title}
          description={video.summary}
          image={video.landscapeImage}
          eyebrow={formatPublishedDate(video.dateReleased?.value, "MMM dd, yyyy") || "Video"}
          fallbackIcon={<Video className="h-10 w-10" />}
          ctaLabel="Watch video"
        />
      ))}
    </CardGridSection>
  );
}

/**
 * AmplifyUP placeable `VideoGrid` (/videos). Bind `videos` to the Sanity
 * `videoPost` Resource (paginated for load more; `?q=` searches titles).
 */
export function VideoGrid(props: VideoGridProps) {
  return (
    <Suspense fallback={null}>
      <VideoGridInner {...props} />
    </Suspense>
  );
}
