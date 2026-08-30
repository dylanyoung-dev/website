import type { Metadata } from "next";
import {
  fetchPageConfigServer,
  listPublishedRoutes,
} from "@amplifyup/sdk/server";
import { metadataFromPageConfig } from "@/lib/amplify-meta";
import { InsightsPageClient } from "../InsightsPageClient";

const PREFIX = "/insights";
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

function routeForSlug(slug: string): string {
  return `${PREFIX}/${slug}`;
}

/**
 * Prefetch published AmplifyUP routes under `/insights/*`.
 * Soft-fails to [] so build still succeeds if Edge is unreachable.
 */
export async function generateStaticParams() {
  if (!trackingId) return [];

  try {
    const routes = await listPublishedRoutes(trackingId);
    return routes
      .map((route) => route.replace(/\/+$/, "") || "/")
      .filter((route) => route.startsWith(`${PREFIX}/`) && route !== PREFIX)
      .map((route) => {
        const rest = route.slice(PREFIX.length + 1);
        const slug = rest.split("/")[0];
        if (
          !slug ||
          slug === "categories" ||
          slug === "series" ||
          slug === "test"
        ) {
          return null;
        }
        return { slug };
      })
      .filter((entry): entry is { slug: string } => Boolean(entry?.slug));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";
  const route = routeForSlug(slug);

  const pageConfig = trackingId
    ? await fetchPageConfigServer(route, trackingId)
    : null;

  return (
    metadataFromPageConfig(pageConfig, {
      baseUrl,
      pathname: `/insights/${slug}`,
    }) ?? {}
  );
}

export default async function InsightsSlugPage({ params }: Props) {
  const { slug } = await params;
  const route = routeForSlug(slug);

  const pageConfig = trackingId
    ? await fetchPageConfigServer(route, trackingId)
    : null;

  return <InsightsPageClient pageConfig={pageConfig} slug={slug} />;
}
