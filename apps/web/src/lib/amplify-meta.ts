import type { Metadata } from "next";
import type { PageConfig } from "@amplifyup/sdk";
import type { IAmplifyPost } from "@/interfaces";
import type { IArticleMeta } from "@/interfaces/IArticleMeta";
import type { IPageMeta } from "@/interfaces/IPageMeta";
import { unwrapAmplifyFields } from "@/lib/amplify-post";
import {
  resolveArticleMeta,
  resolvePageMeta,
  toAbsoluteUrl,
  type IDocumentMeta,
} from "@/lib/document-meta";

type LayoutNode = {
  componentId?: string;
  props?: Record<string, unknown>;
  slots?: Array<{ slotId?: string; children?: LayoutNode[] }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function walkLayoutNodes(
  nodes: LayoutNode[] | undefined,
  visit: (node: LayoutNode) => void
) {
  if (!nodes?.length) return;
  for (const node of nodes) {
    visit(node);
    for (const slot of node.slots || []) {
      walkLayoutNodes(slot.children, visit);
    }
  }
}

function findFirstNode(
  pageConfig: PageConfig | null | undefined,
  componentId: string
): LayoutNode | undefined {
  if (!pageConfig?.layoutTree?.length) return undefined;
  let found: LayoutNode | undefined;
  walkLayoutNodes(pageConfig.layoutTree as LayoutNode[], (node) => {
    if (!found && node.componentId === componentId) {
      found = node;
    }
  });
  return found;
}

function propsFromNode(node: LayoutNode): Record<string, unknown> {
  if (!isRecord(node.props)) return {};
  return unwrapAmplifyFields(node.props.fields ?? node.props);
}

/** Pull PageMeta props from a server-fetched Edge pageConfig. */
export function extractPageMetaFromPageConfig(
  pageConfig: PageConfig | null | undefined
): IPageMeta | undefined {
  const node = findFirstNode(pageConfig, "PageMeta");
  if (!node) return undefined;
  return propsFromNode(node) as IPageMeta;
}

/** Pull ArticleMeta fields from a server-fetched Edge pageConfig. */
export function extractArticleMetaFromPageConfig(
  pageConfig: PageConfig | null | undefined
): { props: IArticleMeta; post?: IAmplifyPost } | undefined {
  const node = findFirstNode(pageConfig, "ArticleMeta");
  if (!node) return undefined;

  const props = propsFromNode(node) as IArticleMeta;
  const post = {
    title: props.title ?? "",
    slug: props.slug ?? "",
    excerpt: props.excerpt,
    metaTitle: props.metaTitle,
    metaDescription: props.metaDescription,
    publishedAt: props.publishedAt,
    canonicalUrl: props.canonicalUrl,
    landscapeImage: props.landscapeImage,
    socialImage: props.socialImage,
    categories: props.categories,
  } as IAmplifyPost;

  return { props, post };
}

export function documentMetaToNextMetadata(meta: IDocumentMeta): Metadata {
  const title = meta.title;
  const description = meta.description;

  return {
    title,
    description,
    keywords: meta.keywords,
    ...(meta.robots
      ? {
          robots: {
            index: !/noindex/i.test(meta.robots),
            follow: !/nofollow/i.test(meta.robots),
          },
        }
      : {}),
    openGraph: {
      type: (meta.ogType as "website" | "article") || "website",
      title: title || undefined,
      description: description || undefined,
      url: meta.canonicalUrl,
      siteName: meta.siteName || "Dylan Young",
      ...(meta.ogImage
        ? {
            images: [
              {
                url: meta.ogImage,
                width: 1200,
                height: 630,
                alt: meta.ogImageAlt || title || "Dylan Young",
              },
            ],
          }
        : {}),
      ...(meta.ogType === "article"
        ? {
            publishedTime: meta.publishedTime,
            modifiedTime: meta.modifiedTime,
            authors: meta.authors,
            section: meta.section,
          }
        : {}),
    },
    twitter: {
      card: meta.twitterCard || "summary_large_image",
      title: title || undefined,
      description: description || undefined,
      ...(meta.ogImage ? { images: [meta.ogImage] } : {}),
      creator: "@dylanyoung_dev",
    },
    alternates: {
      canonical: meta.canonicalUrl,
    },
  };
}

/** Build Next Metadata from Edge PageMeta / ArticleMeta placeables when present. */
export function metadataFromPageConfig(
  pageConfig: PageConfig | null | undefined,
  options: {
    baseUrl: string;
    pathname?: string;
  }
): Metadata | null {
  const article = extractArticleMetaFromPageConfig(pageConfig);
  if (article) {
    const meta = resolveArticleMeta(article.post, article.props, {
      baseUrl: options.baseUrl,
    });
    if (!meta.canonicalUrl && options.pathname) {
      meta.canonicalUrl = toAbsoluteUrl(options.pathname, options.baseUrl);
    }
    return documentMetaToNextMetadata(meta);
  }

  const page = extractPageMetaFromPageConfig(pageConfig);
  if (page) {
    const meta = resolvePageMeta(page, {
      baseUrl: options.baseUrl,
      pathname: options.pathname,
    });
    return documentMetaToNextMetadata(meta);
  }

  return null;
}
