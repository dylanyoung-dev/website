/**
 * Local placeable catalog for AmplifyUP (currently /insights only).
 * component_id in AmplifyUP must match these keys (not Header/Footer).
 */

import type { ComponentType } from "react";
import { InsightsHeroSection } from "./sections/InsightsHeroSection";
import { InsightsPostsSection } from "./sections/InsightsPostsSection";

export const localComponentCatalog: Record<
  string,
  ComponentType<Record<string, unknown>>
> = {
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
