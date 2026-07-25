"use client";

import { FeaturedPost, LatestPosts } from "@/components/blogs";
import { Pagination } from "@/components/ui/pagination";
import { useInsightsPageData } from "../InsightsPageDataProvider";

/** AmplifyUP placeable: insights post list + pagination. component_id: InsightsPosts */
export function InsightsPostsSection() {
  const {
    featuredPost,
    listPosts,
    isSearching,
    showFeatured,
    resultCount,
    searchQuery,
    currentPage,
    totalPages,
    baseUrl,
  } = useInsightsPageData();

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <div className="space-y-10">
        {showFeatured && featuredPost ? (
          <FeaturedPost post={featuredPost} />
        ) : null}

        {isSearching ? (
          <p className="text-sm text-muted-foreground">
            {resultCount} {resultCount === 1 ? "result" : "results"} for{" "}
            <span className="font-medium text-foreground">
              &ldquo;{searchQuery}&rdquo;
            </span>
          </p>
        ) : null}

        <LatestPosts
          posts={listPosts}
          title={isSearching ? "Search Results" : "All Posts"}
          description=""
          showViewAll={false}
          sortLabel="Sorted by newest"
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
  );
}
