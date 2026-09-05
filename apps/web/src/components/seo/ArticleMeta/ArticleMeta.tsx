"use client";

import { useEffect } from "react";
import {
  Field,
  isComposerPreview,
  type FieldEnvelope,
  type LayoutComponentProps,
  type ListRow,
} from "@amplifyup/sdk/react";
import type { IAmplifyPostCategory } from "@/interfaces";
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

function plainSlug(fields: LayoutComponentProps<IArticleMeta>["fields"]): string {
  const slug = fields.slug as unknown;
  if (typeof slug === "string") return slug.trim();
  if (slug && typeof slug === "object" && "value" in slug) {
    return String((slug as FieldEnvelope<string | null>).value ?? "").trim();
  }
  return "";
}

function unwrapCategories(
  rows: ListRow<IAmplifyPostCategory>[] | undefined
): IAmplifyPostCategory[] {
  if (!rows?.length) return [];
  return rows.map((row) => ({
    id: row.id,
    title: row.title?.value ?? undefined,
    slug: row.slug,
  }));
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

  const slug = plainSlug(fields);
  const categories = unwrapCategories(
    fields.categories?.value as ListRow<IAmplifyPostCategory>[] | undefined
  );

  const post = {
    id: slug || "article",
    title: fields.title?.value ?? "",
    slug,
    excerpt: fields.excerpt?.value,
    metaTitle: fields.metaTitle?.value,
    metaDescription: fields.metaDescription?.value,
    publishedAt: fields.publishedAt?.value,
    canonicalUrl: fields.canonicalUrl?.value,
    landscapeImage: fields.landscapeImage?.value ?? undefined,
    socialImage: fields.socialImage?.value ?? undefined,
    categories,
  };

  const meta = resolveArticleMeta(
    post,
    {
      metaTitle: fields.metaTitle?.value,
      metaDescription: fields.metaDescription?.value,
      excerpt: fields.excerpt?.value,
      slug,
      publishedAt: fields.publishedAt?.value,
      canonicalUrl: fields.canonicalUrl?.value,
      landscapeImage: fields.landscapeImage?.value ?? undefined,
      socialImage: fields.socialImage?.value ?? undefined,
      categories,
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
        <Field field={fields.canonicalUrl} />
      </span>
      {inComposer ? <ArticleMetaPreview meta={meta} /> : null}
    </>
  );
}
