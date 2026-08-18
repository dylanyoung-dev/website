"use client";

import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import {
  InsightsPageDataProvider,
  renderAmplifyComponent,
} from "@/components/amplifyup";
import { Layout } from "@/components/ui/Layout/Layout";

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

interface InsightsTestClientProps {
  pageConfig: PageConfig | null;
}

/**
 * Client canvas for `/insights/test`.
 * Missing Edge layout shows AmplifyPageContent fallback / empty canvas — not a 404.
 */
export function InsightsTestClient({ pageConfig }: InsightsTestClientProps) {
  return (
    <Layout
      metaTitle="Insights AmplifyUP test"
      metaDescription="AmplifyUP layout sandbox for insights — use Composer against /insights/test"
      flushTop
    >
      <InsightsPageDataProvider value={emptyPageData}>
        <AmplifyPageContent
          pageConfig={pageConfig}
          renderComponent={renderAmplifyComponent}
        />
      </InsightsPageDataProvider>
    </Layout>
  );
}
