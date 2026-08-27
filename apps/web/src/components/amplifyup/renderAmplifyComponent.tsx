"use client";

import type { ComponentType, ReactNode } from "react";
import { ComponentContextProvider } from "@amplifyup/sdk/react";
import { ArticleGrid } from "@/components/article-grid";
import { ArticleDetail } from "@/components/article-detail";
import { Hero } from "@/components/hero";

/**
 * Placeable registry — keys must match AmplifyUP `component_id`.
 * Same pattern as the SDK README: registry + ComponentContextProvider.
 */
const registry: Record<string, ComponentType<Record<string, unknown>>> = {
  Hero,
  ArticleGrid,
  ArticleDetail,
};

export function renderAmplifyComponent(
  componentId: string,
  props: Record<string, unknown>,
  slots?: Record<string, ReactNode>,
  context?: { layoutNodeId: string }
) {
  const Component = registry[componentId];
  if (!Component) return null;

  return (
    <div
      data-amplifyup-component={componentId}
      data-component-id={componentId}
      data-layout-node-id={context?.layoutNodeId}
    >
      <ComponentContextProvider
        props={props}
        slots={slots}
        layoutNodeId={context?.layoutNodeId}
        componentId={componentId}
      >
        <Component {...props} />
      </ComponentContextProvider>
    </div>
  );
}
