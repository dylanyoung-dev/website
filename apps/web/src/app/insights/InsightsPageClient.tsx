"use client";

import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { AmplifySlugPageScope } from "@/components/amplifyup/AmplifySlugPageScope";
import { renderAmplifyComponent } from "@/components/amplifyup/renderAmplifyComponent";
import { Layout } from "@/components/ui/Layout/Layout";

interface InsightsPageClientProps {
  pageConfig: PageConfig | null;
  /** Set on `/insights/:slug` for Composer "From page" post resolution. */
  slug?: string;
}

function InsightsPageContent({ pageConfig }: { pageConfig: PageConfig | null }) {
  return (
    <AmplifyPageContent
      pageConfig={pageConfig}
      renderComponent={renderAmplifyComponent}
    />
  );
}

export function InsightsPageClient({ pageConfig, slug }: InsightsPageClientProps) {
  const content = (
    <Layout
      metaTitle="Dylan Young: Blog Content on AI, Sitecore and Typescript/React"
      metaDescription="Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more"
      flushTop
    >
      <InsightsPageContent pageConfig={pageConfig} />
    </Layout>
  );

  if (slug) {
    return (
      <AmplifySlugPageScope slug={slug} pageConfig={pageConfig}>
        {content}
      </AmplifySlugPageScope>
    );
  }

  return content;
}
