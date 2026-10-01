"use client";

import { AppGrid } from "@/components/apps/AppGrid";

/**
 * AmplifyUP placeable `AppsShowcase` — placement-only (no fields).
 * Renders the featured app + grid from `lib/apps-catalog.ts`.
 */
export function AppsShowcase() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
      <AppGrid />
    </div>
  );
}
