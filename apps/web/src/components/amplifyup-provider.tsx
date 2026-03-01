"use client";

import { init } from "@amplifyup/sdk";
import { useEffect } from "react";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
const isDev = process.env.NODE_ENV === "development";

export function AmplifyUpProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!trackingId?.trim()) {
      if (isDev) {
        console.warn("AmplifyUp: NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID is not set. SDK not initialized.");
      }
      return;
    }
    init({
      trackingId: trackingId.trim(),
      debug: isDev,
    }).catch((err) => {
      console.error("AmplifyUp SDK: Initialization failed", err);
    });
  }, []);

  return <>{children}</>;
}
