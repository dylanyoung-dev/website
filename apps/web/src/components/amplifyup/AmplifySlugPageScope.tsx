"use client";

import type { ReactNode } from "react";
import { AmplifyUpProvider as SdkAmplifyUpProvider } from "@amplifyup/sdk/react";
import type { PageConfig } from "@amplifyup/sdk";
import { extractPostFromPageConfig } from "@/lib/amplify-post";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim();
const isDev = process.env.NODE_ENV === "development";

interface AmplifySlugPageScopeProps {
  slug: string;
  pageConfig: PageConfig | null;
  children: ReactNode;
}

/**
 * Applies Composer "From page" context for `/insights/:slug` routes.
 * Nested provider updates the SDK singleton with resource key + resolved fields.
 */
export function AmplifySlugPageScope({
  slug,
  pageConfig,
  children,
}: AmplifySlugPageScopeProps) {
  if (!trackingId || !slug.trim()) {
    return children;
  }

  const extractedFields = extractPostFromPageConfig(pageConfig);

  return (
    <SdkAmplifyUpProvider
      config={{ trackingId, debug: isDev }}
      pageContext={{
        resourceType: "post",
        key: slug.trim(),
        ...(extractedFields ? { fields: extractedFields } : {}),
      }}
    >
      {children}
    </SdkAmplifyUpProvider>
  );
}
