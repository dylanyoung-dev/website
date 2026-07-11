import { Metadata } from "next";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { Pagination } from "@/components/ui/pagination";
import { VideoGrid } from "@/components/videos";
import {
  getSearchVideoCount,
  getSearchVideosInRange,
  getTotalVideoCount,
  getVideosInRange,
} from "@/services/videoPost.service";

const VIDEOS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q?.trim();

  return {
    title: query ? `Search Videos: ${query}` : "Dylan Young: Videos",
    description:
      "Talks, tutorials, and demos on AI, Sitecore, and software development from Dylan Young.",
  };
}

export default async function VideoPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const searchQuery = params.q?.trim() || "";
  const isSearching = searchQuery.length > 0;

  const siteVideoCount = await getTotalVideoCount();
  const resultCount = isSearching
    ? await getSearchVideoCount(searchQuery)
    : siteVideoCount;

  const totalPages = Math.max(1, Math.ceil(resultCount / VIDEOS_PER_PAGE));
  const start = (currentPage - 1) * VIDEOS_PER_PAGE;
  const end = currentPage * VIDEOS_PER_PAGE;

  const videos = isSearching
    ? await getSearchVideosInRange(searchQuery, start, end)
    : await getVideosInRange(start, end);

  const baseUrl = isSearching
    ? `/videos?q=${encodeURIComponent(searchQuery)}`
    : "/videos";

  return (
    <Layout
      metaTitle="Dylan Young: Videos"
      metaDescription="Talks, tutorials, and demos on AI, Sitecore, and software development."
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Insights"
          title="Videos"
          description="Talks, tutorials, and demos from YouTube and beyond."
          showSearch
          showCategoryFilters={false}
          searchQuery={searchQuery}
          searchPath="/videos/"
          searchPlaceholder="Search videos..."
        />

        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="space-y-10">
            {isSearching ? (
              <p className="text-sm text-muted-foreground">
                {resultCount} {resultCount === 1 ? "result" : "results"} for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{searchQuery}&rdquo;
                </span>
              </p>
            ) : null}

            <VideoGrid
              videos={videos}
              title={isSearching ? "Search Results" : "All Videos"}
              description={isSearching ? "" : "Talks, tutorials, and demos across YouTube channels"}
              sortLabel={isSearching ? undefined : "Sorted by newest"}
              emptyMessage={
                isSearching
                  ? "No videos matched your search."
                  : "No videos available yet."
              }
            />

            {totalPages > 1 ? (
              <div className="border-t pt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  baseUrl={baseUrl}
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  );
}
