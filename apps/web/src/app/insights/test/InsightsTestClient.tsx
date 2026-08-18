"use client";

import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import {
  InsightsPageDataProvider,
  renderAmplifyComponent,
} from "@/components/amplifyup";
import { Layout } from "@/components/ui/Layout/Layout";

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

export function InsightsTestClient({ pageConfig }: InsightsTestClientProps) {
  return (
    <Layout
      metaTitle="Dylan Young: Blog Content on AI, Sitecore and Typescript/React"
      metaDescription="Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more"
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
