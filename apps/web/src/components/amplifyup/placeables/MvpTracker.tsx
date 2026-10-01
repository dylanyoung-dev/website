"use client";

import { MvpTracker as LegacyMvpTracker } from "@/components/up-to/MvpTracker/MvpTracker";

/**
 * AmplifyUP placeable `MvpTracker` — placement-only (no fields).
 * Contributions come from `lib/mvp-tracker.ts`.
 */
export function MvpTracker() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <LegacyMvpTracker />
    </div>
  );
}
