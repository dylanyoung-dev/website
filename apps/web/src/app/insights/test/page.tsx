"use client";

import {
  AmplifyPageContent,
  isComposerPreview,
  useAmplifyUp,
} from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { notFound } from "next/navigation";
import {
  InsightsPageDataProvider,
  renderAmplifyComponent,
} from "@/components/amplifyup";
import { Layout } from "@/components/ui/Layout/Layout";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim() || "";

/** Minimal context for legacy placeables if Composer still uses them. */
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

function InsightsTestBody() {
  const { pageConfig, loading } = useAmplifyUp();
  const preview = isComposerPreview();

  if (!loading && !preview && !hasAmplifyLayout(pageConfig)) {
    notFound();
  }

  return (
    <InsightsPageDataProvider value={emptyPageData}>
      <AmplifyPageContent renderComponent={renderAmplifyComponent} />
    </InsightsPageDataProvider>
  );
}

/**
 * AmplifyUP sandbox (`/insights/test`).
 * Live: Edge layout only — 404 if nothing is Deployed.
 * Composer preview: empty canvas allowed.
 */
export default function InsightsAmplifyTestPage() {
  if (!trackingId) {
    notFound();
  }

  return (
    <Layout
      metaTitle="Insights AmplifyUP test"
      metaDescription="AmplifyUP layout sandbox for insights — use Composer against /insights/test"
      flushTop
    >
      <InsightsTestBody />
    </Layout>
  );
}
