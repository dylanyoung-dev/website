"use client";

import { useEffect } from "react";
import {
  Field,
  isComposerPreview,
  type LayoutComponentProps,
} from "@amplifyup/sdk/react";
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

type PageMetaContent = Omit<IPageMeta, "title">;

/**
 * AmplifyUP placeable PageMeta (`component_id: PageMeta`).
 * Generic page SEO fields projected from Edge / Composer.
 */
export function PageMeta({ fields }: LayoutComponentProps<PageMetaContent>) {
  const inComposer = isComposerPreview();
  const baseUrl =
    (typeof window !== "undefined" && window.location?.origin) ||
    process.env.NEXT_PUBLIC_HOST_URL ||
    process.env.HOST_URL ||
    "https://dylanyoung.dev";
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : undefined;

  const meta = resolvePageMeta(
    {
      metaTitle: fields.metaTitle?.value,
      metaDescription: fields.metaDescription?.value,
      canonicalUrl: fields.canonicalUrl?.value,
      ogImage: fields.ogImage?.value,
      ogType: fields.ogType?.value,
      keywords: fields.keywords?.value,
      robots: fields.robots?.value,
      twitterCard: fields.twitterCard?.value,
      siteName: fields.siteName?.value,
    },
    { baseUrl, pathname }
  );

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
      <span className="sr-only" aria-hidden>
        <Field field={fields.metaTitle} />
        <Field field={fields.metaDescription} />
        <Field field={fields.canonicalUrl} />
        <Field field={fields.ogImage} />
        <Field field={fields.ogType} />
        <Field field={fields.keywords} />
        <Field field={fields.robots} />
      </span>
      {inComposer ? <PageMetaPreview meta={meta} /> : null}
    </>
  );
}
