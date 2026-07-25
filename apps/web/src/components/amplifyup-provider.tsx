"use client";

import { AmplifyUpProvider as SdkAmplifyUpProvider } from "@amplifyup/sdk/react";
import { isAmplifyUpTarget, normalizeAmplifyUpTarget } from "@amplifyup/sdk";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID?.trim();
const envTarget = process.env.NEXT_PUBLIC_AMPLIFYUP_TARGET;
const target = isAmplifyUpTarget(envTarget)
  ? normalizeAmplifyUpTarget(envTarget)
  : undefined;
const isDev = process.env.NODE_ENV === "development";

/**
 * Initializes AmplifyUp and provides page layout config to AmplifyRenderer.
 * When trackingId is missing, children still render (site shell works without Amplify).
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
    <SdkAmplifyUpProvider
      config={{
        trackingId,
        debug: isDev,
        target,
      }}
    >
      {children}
    </SdkAmplifyUpProvider>
  );
}
