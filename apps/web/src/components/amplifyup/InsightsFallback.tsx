"use client";

import { InsightsHeroSection } from "./sections/InsightsHeroSection";
import { InsightsPostsSection } from "./sections/InsightsPostsSection";

/** Default /insights composition when AmplifyUP has no layoutTree yet. */
export function InsightsFallback() {
  return (
    <section className="relative bg-background">
      <InsightsHeroSection />
      <InsightsPostsSection />
    </section>
  );
}
