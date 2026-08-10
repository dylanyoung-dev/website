"use client";

import { AmplifyUpProvider as SdkAmplifyUpProvider } from "@amplifyup/sdk/react";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim();
const isDev = process.env.NODE_ENV === "development";

/**
 * Production AmplifyUp setup: trackingId only.
 * Edge + Composer preview are handled by the SDK (no URLs / siteId / target).
 */
export function AmplifyUpProvider({ children }: { children: React.ReactNode }) {
  if (!trackingId) {
    if (isDev) {
      console.warn(
        "AmplifyUp: NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID is not set. Layout orchestration disabled."
      );
    }
    return <>{children}</>;
  }

  return (
    <SdkAmplifyUpProvider config={{ trackingId, debug: isDev }}>
      {children}
    </SdkAmplifyUpProvider>
  );
}
