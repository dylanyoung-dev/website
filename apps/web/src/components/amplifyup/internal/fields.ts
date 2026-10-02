import type { FieldEnvelope, ImageValue } from "@amplifyup/sdk/react";

/**
 * Plain slug from whatever Edge projects: a string, a Sanity `{ current }`
 * slug, or a field envelope around either.
 */
export function plainSlug(slug: unknown): string {
  if (typeof slug === "string") return slug.trim();
  if (slug && typeof slug === "object") {
    if ("current" in slug) return String((slug as { current?: string }).current ?? "").trim();
    if ("value" in slug) return plainSlug((slug as FieldEnvelope<unknown>).value);
  }
  return "";
}

/** True when an image field carries a usable URL. */
export function hasImage(field?: FieldEnvelope<ImageValue | null | undefined> | null): boolean {
  return Boolean(field?.value?.url?.trim());
}

/** Absolute URL for share links (client) or the path (server render). */
export function absoluteUrl(path: string): string {
  if (typeof window !== "undefined" && window.location?.origin) {
    return `${window.location.origin}${path}`;
  }
  return path;
}
