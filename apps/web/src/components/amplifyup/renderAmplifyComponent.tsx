"use client";

import type { ComponentType, ReactNode } from "react";
import {
  ComponentContextProvider,
  type LayoutComponentProps,
} from "@amplifyup/sdk/react";
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
// Placeables accept typed LayoutComponentProps<T> & settings; the Edge adapter is untyped.
const components: Record<string, ComponentType<Record<string, unknown>>> = {
  Hero: Hero as ComponentType<Record<string, unknown>>,
  ArticleGrid: ArticleGrid as ComponentType<Record<string, unknown>>,
  ArticleDetail: ArticleDetail as ComponentType<Record<string, unknown>>,
  ArticleMeta: ArticleMeta as ComponentType<Record<string, unknown>>,
  PageMeta: PageMeta as ComponentType<Record<string, unknown>>,
  SubscribeBanner: SubscribeBanner as ComponentType<Record<string, unknown>>,
  AwardsSection: AwardsSection as ComponentType<Record<string, unknown>>,
};

export function renderAmplifyComponent(
  componentId: string,
  props: LayoutComponentProps,
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
