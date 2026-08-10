import { Metadata } from "next";
import { isPreviewRequest } from "@amplifyup/sdk";
import {
  InsightsAmplifyPageContent,
  InsightsFallback,
  InsightsPageDataProvider,
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
  metaTitle: "Insights AmplifyUP test",
  metaDescription:
    "AmplifyUP layout sandbox for insights — use Composer against /insights/test",
  flushTop: true as const,
};

/** Empty page data for Composer preview — no Sanity SSR, but placeables still mount. */
const previewPageData = {
  listPosts: [],
  searchQuery: "",
  isSearching: false,
  showFeatured: false,
  resultCount: 0,
  currentPage: 1,
  totalPages: 1,
  baseUrl: "/insights/test",
  categoryFilters: [],
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Insights AmplifyUP test",
    description:
      "AmplifyUP layout sandbox for insights — use Composer against /insights/test",
    robots: { index: false, follow: false },
  };
}

/**
 * AmplifyUP sandbox for insights placeables (Hero, ArticleGrid, InsightsHero, InsightsPosts).
 * Point Composer at `/insights/test` — production `/insights` stays native until validated here.
 */
export default async function InsightsAmplifyTestPage({ searchParams }: Props) {
  const params = await searchParams;

  if (isPreviewRequest(params)) {
    return (
      <Layout {...layoutProps}>
        <InsightsPageDataProvider value={previewPageData}>
          <InsightsAmplifyPageContent forceComposerPreview />
        </InsightsPageDataProvider>
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
    ? `/insights/test?q=${encodeURIComponent(searchQuery)}`
    : "/insights/test";

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
        <InsightsAmplifyPageContent fallback={<InsightsFallback />} />
      </InsightsPageDataProvider>
    </Layout>
  );
}
