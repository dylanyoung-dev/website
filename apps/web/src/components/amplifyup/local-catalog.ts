/**
 * Local placeable catalog for AmplifyUP.
 * component_id in AmplifyUP must match these keys (not Header/Footer).
 */

import type { ComponentType } from "react";
import { Hero } from "@/components/hero";
import { InsightsHeroSection } from "./sections/InsightsHeroSection";
import { InsightsPostsSection } from "./sections/InsightsPostsSection";

export const localComponentCatalog: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
  Hero,
  InsightsHero: InsightsHeroSection,
  InsightsPosts: InsightsPostsSection,
};

export function getLocalComponent(
  componentId: string
): ComponentType<Record<string, unknown>> | null {
  return localComponentCatalog[componentId] || null;
}

export function listLocalCatalogIds(): string[] {
  return Object.keys(localComponentCatalog);
}
