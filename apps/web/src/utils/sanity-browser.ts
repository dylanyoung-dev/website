import sanityClient from "@sanity/client";

/**
 * Browser-safe Sanity client for Amplify placeables (client components).
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET.
 */
const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.projectId ||
  "";
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.dataset || "";

export const browserSanityClient = sanityClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion: "v2021-10-21",
});

export function isBrowserSanityConfigured(): boolean {
  return Boolean(projectId && dataset);
}
