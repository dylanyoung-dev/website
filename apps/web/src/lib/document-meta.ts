/**
 * Shared document-meta shape used by PageMeta / ArticleMeta placeables
 * and by server-side generateMetadata extraction from Edge pageConfig.
 */

import type { IAmplifyPost } from "@/interfaces";
import type { IArticleMeta } from "@/interfaces/IArticleMeta";
import type { IPageMeta } from "@/interfaces/IPageMeta";

export interface IDocumentMeta {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: string;
  keywords?: string;
  robots?: string;
  twitterCard?: "summary" | "summary_large_image";
  siteName?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  authors?: string[];
}

const DEFAULT_SITE_NAME = "Dylan Young";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export function resolveImageUrl(
  value: unknown
): { url?: string; alt?: string } | undefined {
  if (typeof value === "string" && value.trim()) {
    return { url: value.trim() };
  }
  if (isRecord(value)) {
    const url =
      typeof value.url === "string" && value.url.trim()
        ? value.url.trim()
        : undefined;
    const alt =
      typeof value.alt === "string" && value.alt.trim()
        ? value.alt.trim()
        : undefined;
    if (url || alt) return { url, alt };
  }
  return undefined;
}

export function toAbsoluteUrl(
  value: string | undefined,
  baseUrl: string
): string | undefined {
  if (!value?.trim()) return undefined;
  const trimmed = value.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const base = baseUrl.replace(/\/+$/, "");
  return `${base}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
}

/** Resolve PageMeta props into a document-meta payload. */
export function resolvePageMeta(
  props: IPageMeta,
  options?: { baseUrl?: string; pathname?: string }
): IDocumentMeta {
  const baseUrl = options?.baseUrl || "https://dylanyoung.dev";
  const title = asString(props.metaTitle) || asString(props.title);
  const description = asString(props.metaDescription);
  const image = resolveImageUrl(props.ogImage);
  const canonical =
    toAbsoluteUrl(asString(props.canonicalUrl), baseUrl) ||
    (options?.pathname
      ? toAbsoluteUrl(options.pathname, baseUrl)
      : undefined);

  return {
    title,
    description,
    canonicalUrl: canonical,
    ogImage: image?.url ? toAbsoluteUrl(image.url, baseUrl) : undefined,
    ogImageAlt: image?.alt || title,
    ogType: asString(props.ogType) || "website",
    keywords: asString(props.keywords),
    robots: asString(props.robots),
    twitterCard: props.twitterCard || "summary_large_image",
    siteName: asString(props.siteName) || DEFAULT_SITE_NAME,
  };
}

function getCategoryTitle(post: IAmplifyPost | undefined): string | undefined {
  const first = post?.categories?.[0];
  return first?.title?.trim() || undefined;
}

function getPostImage(post: IAmplifyPost): { url?: string; alt?: string } {
  const social = post.socialImage;
  const landscape = post.landscapeImage;
  const main = post.mainImage;
  const chosen = social?.url ? social : landscape?.url ? landscape : main;
  return {
    url: chosen?.url,
    alt: chosen?.alt || post.title,
  };
}

/** Resolve ArticleMeta + post into a document-meta payload. */
export function resolveArticleMeta(
  post: IAmplifyPost | undefined,
  props: IArticleMeta = {},
  options?: { baseUrl?: string }
): IDocumentMeta {
  const baseUrl = options?.baseUrl || "https://dylanyoung.dev";
  const title =
    asString(props.metaTitle) ||
    asString(post?.metaTitle) ||
    asString(post?.title) ||
    asString(props.title);
  const description =
    asString(props.metaDescription) ||
    asString(post?.metaDescription) ||
    asString(props.excerpt) ||
    asString(post?.excerpt);
  const slug = asString(props.slug) || asString(post?.slug);
  const image = post ? getPostImage(post) : {};
  const canonical =
    toAbsoluteUrl(
      asString(props.canonicalUrl) || asString(post?.canonicalUrl),
      baseUrl
    ) ||
    (slug ? toAbsoluteUrl(`/insights/${slug}/`, baseUrl) : undefined);
  const section = getCategoryTitle(post);
  const publishedTime =
    asString(props.publishedAt) || asString(post?.publishedAt);

  return {
    title,
    description,
    canonicalUrl: canonical,
    ogImage: image.url ? toAbsoluteUrl(image.url, baseUrl) : undefined,
    ogImageAlt: image.alt || title,
    ogType: "article",
    keywords: (post?.categories || [])
      .map((c) => c.title?.trim())
      .filter(Boolean)
      .join(", "),
    twitterCard: "summary_large_image",
    siteName: DEFAULT_SITE_NAME,
    publishedTime,
    modifiedTime: asString(post?._updatedAt) || publishedTime,
    section,
    authors: ["Dylan Young"],
  };
}

function upsertMeta(
  attr: "name" | "property",
  key: string,
  content: string | undefined
) {
  if (typeof document === "undefined") return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!content?.trim()) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content.trim();
}

function upsertLink(rel: string, href: string | undefined) {
  if (typeof document === "undefined") return;
  const selector = `link[rel="${rel}"]`;
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!href?.trim()) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href.trim();
}

/** Apply resolved meta to the live document (client / Composer). */
export function applyDocumentMeta(meta: IDocumentMeta) {
  if (typeof document === "undefined") return;

  if (meta.title?.trim()) {
    document.title = meta.title.trim();
  }

  upsertMeta("name", "description", meta.description);
  upsertMeta("name", "keywords", meta.keywords);
  upsertMeta("name", "robots", meta.robots);

  upsertMeta("property", "og:title", meta.title);
  upsertMeta("property", "og:description", meta.description);
  upsertMeta("property", "og:type", meta.ogType || "website");
  upsertMeta("property", "og:url", meta.canonicalUrl);
  upsertMeta("property", "og:site_name", meta.siteName || DEFAULT_SITE_NAME);
  upsertMeta("property", "og:image", meta.ogImage);
  upsertMeta("property", "og:image:alt", meta.ogImageAlt);

  if (meta.publishedTime) {
    upsertMeta("property", "article:published_time", meta.publishedTime);
  }
  if (meta.modifiedTime) {
    upsertMeta("property", "article:modified_time", meta.modifiedTime);
  }
  if (meta.section) {
    upsertMeta("property", "article:section", meta.section);
  }
  for (const author of meta.authors || []) {
    if (author.trim()) {
      upsertMeta("property", "article:author", author);
    }
  }

  const twitterCard = meta.twitterCard || "summary_large_image";
  upsertMeta("name", "twitter:card", twitterCard);
  upsertMeta("name", "twitter:title", meta.title);
  upsertMeta("name", "twitter:description", meta.description);
  upsertMeta("name", "twitter:image", meta.ogImage);
  upsertMeta("name", "twitter:creator", "@dylanyoung_dev");

  upsertLink("canonical", meta.canonicalUrl);
}
