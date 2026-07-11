import { Metadata } from "next";
import { FeaturedPost, LatestPosts } from "@/components/blogs";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { Pagination } from "@/components/ui/pagination";
import { buildInsightsCategoryFilters } from "@/lib/insights-filters";
import {
  getPostCategoriesByPostCount,
  getPosts,
  getPostsInRange,
  getSearchPostCount,
  getSearchPostsInRange,
  getTotalPostCount,
} from "@/services/post.service";
const POSTS_PER_PAGE = 12;

type Props = {
  searchParams: Promise<{ page?: string; q?: string }>;
};

function getListRange(page: number, skipFeatured: boolean) {
  if (skipFeatured && page === 1) {
    return { start: 1, end: 1 + POSTS_PER_PAGE };
  }

  if (skipFeatured) {
    return {
      start: 1 + (page - 1) * POSTS_PER_PAGE,
      end: 1 + page * POSTS_PER_PAGE,
    };
  }

  return {
    start: (page - 1) * POSTS_PER_PAGE,
    end: page * POSTS_PER_PAGE,
  };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const query = params.q?.trim();
  const totalPosts = query
    ? await getSearchPostCount(query)
    : await getTotalPostCount();
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const baseUrl = process.env.HOST_URL || "";
  const insightsUrl = `${baseUrl}/insights`;

  const metadata: Metadata = {
    title:
      page === 1 && !query
        ? "Dylan Young: Blog Content on AI, Sitecore and Typescript/React"
        : query
          ? `Search: ${query}${page > 1 ? ` - Page ${page}` : ""}`
          : `Dylan Young: Blog Content - Page ${page}`,
    description:
      "Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more",
    alternates: {
      canonical: page === 1 ? insightsUrl : `${insightsUrl}?page=${page}`,
      types: {
        "application/rss+xml": [
          { url: `${baseUrl}/feed.xml`, title: "Dylan Young RSS Feed" },
        ],
      },
    },
  };

  return metadata;
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const searchQuery = params.q?.trim() || "";
  const isSearching = searchQuery.length > 0;
  const showFeatured = currentPage === 1 && !isSearching;

  const [sitePostCount, allCategories] = await Promise.all([
    getTotalPostCount(),
    getPostCategoriesByPostCount(),
  ]);

  const categoryFilters = buildInsightsCategoryFilters(allCategories);
  const resultCount = isSearching
    ? await getSearchPostCount(searchQuery)
    : sitePostCount;

  const totalPages = isSearching
    ? Math.max(1, Math.ceil(resultCount / POSTS_PER_PAGE))
    : Math.max(1, Math.ceil(Math.max(resultCount - 1, 0) / POSTS_PER_PAGE));
  const { start, end } = getListRange(currentPage, showFeatured);

  const [featuredPost, listPosts] = await Promise.all([
    showFeatured ? getPosts(1).then((posts) => posts[0]) : Promise.resolve(undefined),
    isSearching
      ? getSearchPostsInRange(searchQuery, start, end)
      : getPostsInRange(start, end),
  ]);

  const baseUrl = isSearching
    ? `/insights?q=${encodeURIComponent(searchQuery)}`
    : "/insights";

  return (
    <Layout
      metaTitle="Dylan Young: Blog Content on AI, Sitecore and Typescript/React"
      metaDescription="Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more"
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          searchQuery={searchQuery}
          title="Writing on AI, Sitecore & the craft of software."
          description="Articles, tutorials, and deep dives."
          activeCategoryHref={isSearching ? undefined : "/insights/"}
          categories={categoryFilters}
        />
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
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
      </section>    </Layout>
  );
}
