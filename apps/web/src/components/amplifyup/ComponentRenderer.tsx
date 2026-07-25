"use client";

import type { ReactNode } from "react";
import { ComponentContextProvider } from "@amplifyup/sdk/react";
import { getLocalComponent } from "./local-catalog";

interface ComponentRendererProps {
  componentId: string;
  props: Record<string, any>;
  slots?: Record<string, ReactNode>;
}

/**
 * Maps AmplifyUP layout nodes to local React components.
 * Header and Footer stay outside AmplifyRenderer (site chrome).
 */
export function ComponentRenderer({
  componentId,
  props,
  slots,
}: ComponentRendererProps) {
  const Component = getLocalComponent(componentId);

  if (!Component) {
    console.warn(
      `[ComponentRenderer] "${componentId}" is not in the local placeable catalog`
    );
    return (
      <div className="my-4 rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/40">
        <p className="text-sm text-amber-900 dark:text-amber-100">
          Component &quot;{componentId}&quot; is not registered in this site&apos;s
          AmplifyUP catalog. Add it under{" "}
          <code className="text-xs">components/amplifyup/local-catalog.ts</code>.
        </p>
      </div>
    );
  }

  return (
    <div data-amplifyup-component={componentId} data-component-id={componentId}>
      <ComponentContextProvider slots={slots} props={props}>
        <Component {...props} slots={slots} />
      </ComponentContextProvider>
    </div>
  );
}
