"use client";

import type { ComponentType, ReactNode } from "react";
import { ComponentContextProvider } from "@amplifyup/sdk/react";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleDetail } from "@/components/article-detail";
import { AwardsSection } from "@/components/home";
import { Hero } from "@/components/hero";
import { ArticleMeta, PageMeta } from "@/components/seo";
import { SubscribeBanner } from "@/components/subscribe";

/**
 * Thin `renderComponent` adapter for AmplifyPageContent.
 * Do not grow this into a local catalog/registry — AmplifyUP owns that concept.
 * New placeables: add one map entry here after registering the component_id in Composer.
 */
const components: Record<string, ComponentType<Record<string, unknown>>> = {
  Hero,
  ArticleGrid,
  ArticleDetail,
  ArticleMeta,
  PageMeta,
  SubscribeBanner,
  AwardsSection,
};

export function renderAmplifyComponent(
  componentId: string,
  props: Record<string, unknown>,
  slots?: Record<string, ReactNode>,
  context?: { layoutNodeId: string }
) {
  const Component = components[componentId];
  if (!Component) return null;

  return (
    <ComponentContextProvider
      props={props}
      slots={slots}
      layoutNodeId={context?.layoutNodeId}
      componentId={componentId}
    >
      <Component {...props} />
    </ComponentContextProvider>
  );
}
