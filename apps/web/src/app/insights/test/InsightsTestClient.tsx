"use client";

import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { renderAmplifyComponent } from "@/components/amplifyup/renderAmplifyComponent";
import { Layout } from "@/components/ui/Layout/Layout";

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
      <AmplifyPageContent
        pageConfig={pageConfig}
        renderComponent={renderAmplifyComponent}
      />
    </Layout>
  );
}
