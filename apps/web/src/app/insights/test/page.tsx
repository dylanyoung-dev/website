import { Metadata } from "next";
import { isPreviewRequest } from "@amplifyup/sdk";
import { fetchPageConfigServer } from "@amplifyup/sdk/server";
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
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";

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

/** Empty page data for Composer preview — placeables that need page context still mount. */
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
 * AmplifyUP sandbox (`/insights/test`).
 * SDK resolves via Edge (live) or orchestrator (Composer preview).
 * Fallback = native insights UI until the route is Deployed.
 */
export default async function InsightsAmplifyTestPage({ searchParams }: Props) {
  const params = await searchParams;
  const preview = isPreviewRequest(params);

  const pageConfig = trackingId
    ? await fetchPageConfigServer("/insights/test", trackingId, preview, {
        searchParams: params,
      })
    : null;

  if (preview) {
    return (
      <Layout {...layoutProps}>
        <InsightsPageDataProvider value={previewPageData}>
          <InsightsAmplifyPageContent
            pageConfig={pageConfig}
            forceComposerPreview
          />
        </InsightsPageDataProvider>
      </Layout>
    );
  }

  // Sanity SSR only for native fallback when Edge has no published layout.
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
        <InsightsAmplifyPageContent
          pageConfig={pageConfig}
          fallback={<InsightsFallback />}
        />
      </InsightsPageDataProvider>
    </Layout>
  );
}
