"use client";

import { useEffect } from "react";
import { Field, isComposerPreview, useComponentProps } from "@amplifyup/sdk/react";
import type { IPageMeta } from "@/interfaces/IPageMeta";
import {
  applyDocumentMeta,
  resolvePageMeta,
  type IDocumentMeta,
} from "@/lib/document-meta";

function PageMetaPreview({ meta }: { meta: IDocumentMeta }) {
  return (
    <div
      className="border-b border-dashed border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground"
      data-amplifyup-meta-preview="PageMeta"
    >
      <p className="font-semibold text-foreground">PageMeta</p>
      <p className="mt-1">
        <span className="font-medium">Title:</span> {meta.title || "(empty)"}
      </p>
      <p>
        <span className="font-medium">Description:</span>{" "}
        {meta.description || "(empty)"}
      </p>
      {meta.canonicalUrl ? (
        <p>
          <span className="font-medium">Canonical:</span> {meta.canonicalUrl}
        </p>
      ) : null}
    </div>
  );
}

/**
 * AmplifyUP placeable PageMeta (`component_id: PageMeta`).
 * Generic page SEO fields projected from Edge / Composer.
 */
export function PageMeta() {
  const live = useComponentProps<IPageMeta>();
  const inComposer = isComposerPreview();
  const baseUrl =
    (typeof window !== "undefined" && window.location?.origin) ||
    process.env.NEXT_PUBLIC_HOST_URL ||
    process.env.HOST_URL ||
    "https://dylanyoung.dev";
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  const meta = resolvePageMeta(live, { baseUrl, pathname });

  useEffect(() => {
    applyDocumentMeta(meta);
  }, [
    meta.title,
    meta.description,
    meta.canonicalUrl,
    meta.ogImage,
    meta.ogType,
    meta.keywords,
    meta.robots,
  ]);

  return (
    <>
      {/* Keep Field bindings discoverable for Composer / Edge projection */}
      <span className="sr-only" aria-hidden>
        <Field name="metaTitle" />
        <Field name="metaDescription" />
        <Field name="canonicalUrl" />
        <Field name="ogImage" />
        <Field name="ogType" />
        <Field name="keywords" />
        <Field name="robots" />
      </span>
      {inComposer ? <PageMetaPreview meta={meta} /> : null}
    </>
  );
}
