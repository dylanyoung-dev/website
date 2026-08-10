import { Metadata } from "next";
import { notFound } from "next/navigation";
import { isPreviewRequest } from "@amplifyup/sdk";
import { fetchPageConfigServer } from "@amplifyup/sdk/server";
import type { PageConfig } from "@amplifyup/sdk";
import {
  InsightsAmplifyPageContent,
  InsightsPageDataProvider,
} from "@/components/amplifyup";
import { Layout } from "@/components/ui/Layout/Layout";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";

type Props = {
  searchParams: Promise<{
    preview?: string;
    visualEditor?: string;
  }>;
};

const layoutProps = {
  metaTitle: "Insights AmplifyUP test",
  metaDescription:
    "AmplifyUP layout sandbox for insights — use Composer against /insights/test",
  flushTop: true as const,
};

/** Minimal context for legacy placeables (InsightsHero / InsightsPosts) if Composer uses them. */
const emptyPageData = {
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

function hasAmplifyLayout(pageConfig: PageConfig | null): boolean {
  return !!(
    pageConfig &&
    pageConfig.id !== "default" &&
    Array.isArray(pageConfig.layoutTree) &&
    pageConfig.layoutTree.length > 0
  );
}

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
 * Live: Edge layout only — 404 if nothing is Deployed.
 * Composer preview: empty canvas allowed (orchestrator drafts).
 */
export default async function InsightsAmplifyTestPage({ searchParams }: Props) {
  const params = await searchParams;
  const preview = isPreviewRequest(params);

  if (!trackingId) {
    notFound();
  }

  const pageConfig = await fetchPageConfigServer(
    "/insights/test",
    trackingId,
    preview,
    { searchParams: params }
  );

  if (!preview && !hasAmplifyLayout(pageConfig)) {
    notFound();
  }

  return (
    <Layout {...layoutProps}>
      <InsightsPageDataProvider value={emptyPageData}>
        <InsightsAmplifyPageContent
          pageConfig={pageConfig}
          forceComposerPreview={preview}
        />
      </InsightsPageDataProvider>
    </Layout>
  );
}
