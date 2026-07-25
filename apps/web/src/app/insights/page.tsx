import { Metadata } from "next";
import { isPreviewRequest } from "@amplifyup/sdk";
import { AmplifyPageContent } from "@amplifyup/sdk/react";
import {
  InsightsFallback,
  InsightsPageDataProvider,
  renderAmplifyComponent,
} from "@/components/amplifyup";
import { Layout } from "@/components/ui/Layout/Layout";
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
  searchParams: Promise<{
    page?: string;
    q?: string;
    preview?: string;
    visualEditor?: string;
  }>;
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

const layoutProps = {
  metaTitle: "Dylan Young: Blog Content on AI, Sitecore and Typescript/React",
  metaDescription:
    "Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more",
  flushTop: true as const,
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  const query = params.q?.trim();
  const totalPosts = query
    ? await getSearchPostCount(query)
    : await getTotalPostCount();
  const baseUrl = process.env.HOST_URL || "";
  const insightsUrl = `${baseUrl}/insights`;

  return {
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
}

export default async function InsightsPage({ searchParams }: Props) {
  const params = await searchParams;

  if (isPreviewRequest(params)) {
    return (
      <Layout {...layoutProps}>
        <AmplifyPageContent renderComponent={renderAmplifyComponent} />
      </Layout>
    );
  }

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
    showFeatured
      ? getPosts(1).then((posts) => posts[0])
      : Promise.resolve(undefined),
    isSearching
      ? getSearchPostsInRange(searchQuery, start, end)
      : getPostsInRange(start, end),
  ]);

  const baseUrl = isSearching
    ? `/insights?q=${encodeURIComponent(searchQuery)}`
    : "/insights";

  return (
    <Layout {...layoutProps}>
      <InsightsPageDataProvider
        value={{
          featuredPost,
          listPosts,
          searchQuery,
          isSearching,
          showFeatured,
          resultCount,
          currentPage,
          totalPages,
          baseUrl,
          categoryFilters,
        }}
      >
        <AmplifyPageContent
          fallback={<InsightsFallback />}
          renderComponent={renderAmplifyComponent}
        />
      </InsightsPageDataProvider>
    </Layout>
  );
}
