"use client";

import { Timeline } from "@/components/ui/Timeline";
import { ABOUT_TIMELINE } from "@/lib/about-timeline";

type CareerTimelineProps = {
  /** Setting: section heading. */
  heading?: string;
  /** Setting: line under the heading. */
  description?: string;
};

/**
 * AmplifyUP placeable `CareerTimeline` — placement-only.
 * Events are bundled in `lib/about-timeline.tsx`; heading/description are
 * plain Composer settings, not fields.
 */
export function CareerTimeline({ heading, description }: CareerTimelineProps) {
  return (
    <div className="container mx-auto max-w-4xl space-y-6 px-4 py-8 md:py-12">
      {heading || description ? (
        <div className="space-y-2">
          {heading ? (
            <h2 className="text-3xl font-bold md:text-4xl">{heading}</h2>
          ) : null}
          {description ? (
            <p className="text-muted-foreground">{description}</p>
          ) : null}
        </div>
      ) : null}
      <Timeline events={ABOUT_TIMELINE} />
    </div>
  );
}
