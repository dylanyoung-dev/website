import type { PageConfig } from "@amplifyup/sdk";
import { isFieldEnvelope } from "@amplifyup/sdk/react";
import type { IAmplifyPost } from "@/interfaces";

const POST_PROP_KEYS = [
  "id",
  "_id",
  "title",
  "slug",
  "excerpt",
  "body",
  "publishedAt",
  "readingTime",
  "metaTitle",
  "metaDescription",
  "canonicalUrl",
  "mainImage",
  "landscapeImage",
  "socialImage",
  "categories",
  "tagging",
  "_updatedAt",
] as const;

type LayoutNode = {
  componentId?: string;
  props?: Record<string, unknown>;
  slots?: Array<{ slotId?: string; children?: LayoutNode[] }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** Unwrap AmplifyUP field envelopes (`{ value, name }`) to plain values. */
export function unwrapAmplifyFields(source: unknown): Record<string, unknown> {
  if (!isRecord(source)) return {};
  const out: Record<string, unknown> = {};
  for (const [key, raw] of Object.entries(source)) {
    if (isFieldEnvelope(raw)) {
      out[key] = raw.value;
      continue;
    }
    if (isRecord(raw) && !Array.isArray(raw)) {
      const nested = unwrapAmplifyFields(raw);
      out[key] = Object.keys(nested).length ? nested : raw;
      continue;
    }
    out[key] = raw;
  }
  return out;
}

function hasPostContent(value: Record<string, unknown>): boolean {
  const title = typeof value.title === "string" ? value.title.trim() : "";
  const body = typeof value.body === "string" ? value.body.trim() : "";
  const slug = typeof value.slug === "string" ? value.slug.trim() : "";
  return Boolean(title || body || slug);
}

function pickPostFields(source: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {};
  for (const key of POST_PROP_KEYS) {
    if (source[key] !== undefined) {
      picked[key] = source[key];
    }
  }
  return picked;
}

function normalizeAmplifyPost(raw: unknown): IAmplifyPost | undefined {
  if (!isRecord(raw)) return undefined;
  if (!hasPostContent(raw)) return undefined;

  const slug =
    typeof raw.slug === "string"
      ? raw.slug.trim()
      : isRecord(raw.slug) && typeof raw.slug.current === "string"
        ? raw.slug.current.trim()
        : "";

  const title = typeof raw.title === "string" ? raw.title.trim() : "";

  return {
    ...raw,
    _id: String(raw._id || raw.id || slug || title),
    id: typeof raw.id === "string" ? raw.id : undefined,
    title,
    slug,
  } as IAmplifyPost;
}

function walkLayoutNodes(nodes: LayoutNode[] | undefined, visit: (node: LayoutNode) => void) {
  if (!nodes?.length) return;
  for (const node of nodes) {
    visit(node);
    for (const slot of node.slots || []) {
      walkLayoutNodes(slot.children, visit);
    }
  }
}

/**
 * Pull a resolved post from server-fetched page config (for slug pageContext).
 * Reads `props.fields` envelopes from ArticleDetail nodes.
 */
export function extractPostFromPageConfig(
  pageConfig: PageConfig | null | undefined
): Record<string, unknown> | undefined {
  if (!pageConfig?.layoutTree?.length) return undefined;

  let found: Record<string, unknown> | undefined;
  walkLayoutNodes(pageConfig.layoutTree as LayoutNode[], (node) => {
    if (found || node.componentId !== "ArticleDetail") return;
    const props = node.props;
    if (!isRecord(props)) return;

    const unwrapped = unwrapAmplifyFields(props.fields ?? props);
    const nestedPost = isRecord(unwrapped.post)
      ? normalizeAmplifyPost(unwrapAmplifyFields(unwrapped.post))
      : undefined;
    const resolved =
      nestedPost || normalizeAmplifyPost(pickPostFields(unwrapped));
    if (resolved) {
      found = resolved as unknown as Record<string, unknown>;
    }
  });

  return found;
}
