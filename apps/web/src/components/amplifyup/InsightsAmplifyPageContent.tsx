"use client";

import type { ReactNode } from "react";
import { AmplifyPageContent } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { renderAmplifyComponent } from "./renderAmplifyComponent";

interface InsightsAmplifyPageContentProps {
  fallback?: ReactNode;
  /** Pre-fetched layout (optional SSR for Composer). */
  pageConfig?: PageConfig | null;
  /** Ensure Composer canvas mounts before client preview detection. */
  forceComposerPreview?: boolean;
}

/**
 * Client boundary for AmplifyPageContent.
 * `renderComponent` must live here — Server Components cannot pass functions to Client Components.
 */
export function InsightsAmplifyPageContent({
  fallback,
  pageConfig,
  forceComposerPreview,
}: InsightsAmplifyPageContentProps) {
  return (
    <AmplifyPageContent
      fallback={fallback}
      pageConfig={pageConfig}
      forceComposerPreview={forceComposerPreview}
      renderComponent={renderAmplifyComponent}
    />
  );
}
