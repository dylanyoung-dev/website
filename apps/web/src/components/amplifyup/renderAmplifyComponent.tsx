"use client";

import type { ReactNode } from "react";
import { ComponentRenderer } from "./ComponentRenderer";

/** Maps AmplifyUP component IDs to this site's React components. */
export function renderAmplifyComponent(
  componentId: string,
  props: Record<string, any>,
  slots?: Record<string, ReactNode>
) {
  return (
    <ComponentRenderer componentId={componentId} props={props} slots={slots} />
  );
}
