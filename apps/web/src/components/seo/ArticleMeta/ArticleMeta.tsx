"use client";

import { useEffect } from "react";
import {
  Field,
  isComposerPreview,
  type LayoutComponentProps,
} from "@amplifyup/sdk/react";
import type { IArticleMeta } from "@/interfaces/IArticleMeta";
import {
  applyDocumentMeta,
  resolveArticleMeta,
  type IDocumentMeta,
} from "@/lib/document-meta";

function ArticleMetaPreview({ meta }: { meta: IDocumentMeta }) {
  return (
    <div
      className="border-b border-dashed border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground"
      data-amplifyup-meta-preview="ArticleMeta"
    >
      <p className="font-semibold text-foreground">ArticleMeta</p>
      <p className="mt-1">
        <span className="font-medium">Title:</span> {meta.title || "(empty)"}
      </p>
      <p>
        <span className="font-medium">Description:</span>{" "}
        {meta.description || "(empty)"}
      </p>
    </div>
  );
}

/**
 * AmplifyUP placeable ArticleMeta (`component_id: ArticleMeta`).
 * SEO from the same flat entity fields as ArticleDetail.
 */
export function ArticleMeta({ fields }: LayoutComponentProps<IArticleMeta>) {
  const inComposer = isComposerPreview();
  const baseUrl =
    (typeof window !== "undefined" && window.location?.origin) ||
    process.env.NEXT_PUBLIC_HOST_URL ||
    process.env.HOST_URL ||
    "https://dylanyoung.dev";

  const post = {
    title: fields.title?.value ?? "",
    slug: fields.slug?.value ?? "",
    excerpt: fields.excerpt?.value,
    metaTitle: fields.metaTitle?.value,
    metaDescription: fields.metaDescription?.value,
    publishedAt: fields.publishedAt?.value,
    canonicalUrl: fields.canonicalUrl?.value,
    landscapeImage: fields.landscapeImage?.value ?? undefined,
    socialImage: fields.socialImage?.value ?? undefined,
    categories: fields.categories?.value,
  };

  const meta = resolveArticleMeta(
    post,
    {
      metaTitle: fields.metaTitle?.value,
      metaDescription: fields.metaDescription?.value,
      excerpt: fields.excerpt?.value,
      slug: fields.slug?.value,
      publishedAt: fields.publishedAt?.value,
      canonicalUrl: fields.canonicalUrl?.value,
      landscapeImage: fields.landscapeImage?.value ?? undefined,
      socialImage: fields.socialImage?.value ?? undefined,
      categories: fields.categories?.value,
    },
    { baseUrl }
  );

  useEffect(() => {
    applyDocumentMeta(meta);
  }, [
    meta.title,
    meta.description,
    meta.canonicalUrl,
    meta.ogImage,
    meta.publishedTime,
    meta.section,
  ]);

  return (
    <>
      <span className="sr-only" aria-hidden>
        <Field field={fields.metaTitle} />
        <Field field={fields.metaDescription} />
        <Field field={fields.title} />
        <Field field={fields.excerpt} />
        <Field field={fields.slug} />
        <Field field={fields.canonicalUrl} />
        <Field field={fields.landscapeImage} />
      </span>
      {inComposer ? <ArticleMetaPreview meta={meta} /> : null}
    </>
  );
}
