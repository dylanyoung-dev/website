"use client";

import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { renderAmplifyComponent } from "@/components/amplifyup/renderAmplifyComponent";
import { Layout } from "@/components/ui/Layout/Layout";

interface InsightsPageClientProps {
  pageConfig: PageConfig | null;
}

export function InsightsPageClient({ pageConfig }: InsightsPageClientProps) {
  return (
    <Layout flushTop>
      <AmplifyPageContent
        pageConfig={pageConfig}
        renderComponent={renderAmplifyComponent}
      />
    </Layout>
  );
}
