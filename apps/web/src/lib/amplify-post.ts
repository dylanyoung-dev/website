import type { PageConfig } from "@amplifyup/sdk";
import type { IAmplifyPost } from "@/interfaces";

const PAGE_RESOURCE_MARKER = "__amplifyupPageResource";

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
  "mainImage",
  "landscapeImage",
  "categories",
  "tagging",
] as const;

type LayoutNode = {
  componentId?: string;
  props?: Record<string, unknown>;
  slots?: Array<{ slotId?: string; children?: LayoutNode[] }>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isPageResourceSentinel(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value[PAGE_RESOURCE_MARKER] === "string"
  );
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

/** Normalize Edge / Composer post payloads (`id` vs `_id`, etc.). */
export function normalizeAmplifyPost(raw: unknown): IAmplifyPost | undefined {
  if (!isRecord(raw) || isPageResourceSentinel(raw)) return undefined;
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

/**
 * Resolve a post from `<Field name="post">` or flat entity props on the component.
 * AmplifyUP may bind a single `post` object or project entity fields at the prop root.
 */
export function resolveAmplifyPost(
  fieldPost: unknown,
  componentProps: Record<string, unknown>
): IAmplifyPost | undefined {
  const fromField = normalizeAmplifyPost(fieldPost);
  if (fromField) return fromField;

  const nestedPost = normalizeAmplifyPost(componentProps.post);
  if (nestedPost) return nestedPost;

  const picked = pickPostFields(componentProps);
  return normalizeAmplifyPost(picked);
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

/** Pull a resolved post from server-fetched page config (for slug pageContext). */
export function extractPostFromPageConfig(
  pageConfig: PageConfig | null | undefined
): Record<string, unknown> | undefined {
  if (!pageConfig?.layoutTree?.length) return undefined;

  let found: Record<string, unknown> | undefined;
  walkLayoutNodes(pageConfig.layoutTree as LayoutNode[], (node) => {
    if (found || node.componentId !== "ArticleDetail") return;
    const props = node.props;
    if (!isRecord(props)) return;

    const resolved = resolveAmplifyPost(props.post, props);
    if (resolved) {
      found = resolved as unknown as Record<string, unknown>;
    }
  });

  return found;
}
