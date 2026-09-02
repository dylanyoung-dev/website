"use client";

import { useEffect } from "react";
import { Field, isComposerPreview, useComponentProps } from "@amplifyup/sdk/react";
import type { IAmplifyPost } from "@/interfaces";
import type { IArticleMeta } from "@/interfaces/IArticleMeta";
import { resolveAmplifyPost } from "@/lib/amplify-post";
import {
  applyDocumentMeta,
  resolveArticleMeta,
  type IDocumentMeta,
} from "@/lib/document-meta";

function ArticleMetaPreview({
  meta,
  post,
}: {
  meta: IDocumentMeta;
  post?: IAmplifyPost;
}) {
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
      <p>
        <span className="font-medium">Post:</span>{" "}
        {post?.title || post?.slug || "(unresolved)"}
      </p>
    </div>
  );
}

function ArticleMetaBody({
  post,
  props,
}: {
  post?: IAmplifyPost;
  props: IArticleMeta;
}) {
  const inComposer = isComposerPreview();
  const baseUrl =
    (typeof window !== "undefined" && window.location?.origin) ||
    process.env.NEXT_PUBLIC_HOST_URL ||
    process.env.HOST_URL ||
    "https://dylanyoung.dev";
  const meta = resolveArticleMeta(post, props, { baseUrl });

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

  if (!inComposer) return null;
  return <ArticleMetaPreview meta={meta} post={post} />;
}

/**
 * AmplifyUP placeable ArticleMeta (`component_id: ArticleMeta`).
 * Reads the Edge-projected post (same binding as ArticleDetail) for article SEO.
 */
export function ArticleMeta() {
  const componentProps = useComponentProps<IArticleMeta & Record<string, unknown>>();

  return (
    <Field
      value={componentProps.post}
      render={(fieldPost) => {
        const post = resolveAmplifyPost(fieldPost, componentProps);
        return <ArticleMetaBody post={post} props={componentProps} />;
      }}
    />
  );
}
