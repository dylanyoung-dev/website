"use client";

import { InsightsHero } from "@/components/insights";
import { useInsightsPageData } from "../InsightsPageDataProvider";

/** AmplifyUP placeable: insights page hero. component_id: InsightsHero */
export function InsightsHeroSection() {
  const { searchQuery, isSearching, categoryFilters } = useInsightsPageData();

  return (
    <InsightsHero
      searchQuery={searchQuery}
      title="Writing on AI, Sitecore & the craft of software."
      description="Articles, tutorials, and deep dives."
      activeCategoryHref={isSearching ? undefined : "/insights/"}
      categories={categoryFilters}
    />
  );
}
