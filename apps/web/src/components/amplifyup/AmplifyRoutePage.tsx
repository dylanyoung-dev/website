"use client";

import type { PageConfig } from "@amplifyup/sdk";
import { AmplifyPage } from "@/.amplifyup/component-registry";
import { Layout } from "@/components/ui/Layout/Layout";
import { MigrationInProgress } from "./MigrationInProgress";

interface AmplifyRoutePageProps {
  pageConfig: PageConfig | null;
}

/** Site chrome + the AmplifyUP-resolved layout for the current route. */
export function AmplifyRoutePage({ pageConfig }: AmplifyRoutePageProps) {
  return (
    <Layout flushTop>
      <AmplifyPage pageConfig={pageConfig} fallback={<MigrationInProgress />} />
    </Layout>
  );
}
