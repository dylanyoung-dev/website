"use client";

import { Timeline } from "@/components/ui/Timeline";
import { ABOUT_TIMELINE } from "@/lib/about-timeline";

/**
 * AmplifyUP placeable `CareerTimeline` — placement-only, one-off for /about.
 * Copy and events are bundled (`lib/about-timeline.tsx`); nothing to configure.
 */
export function CareerTimeline() {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8 md:py-12">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold md:text-4xl">Career Timeline</h2>
        <p className="text-muted-foreground">
          Key milestones and achievements throughout my career
        </p>
      </div>
      <Timeline events={ABOUT_TIMELINE} />
    </div>
  );
}
