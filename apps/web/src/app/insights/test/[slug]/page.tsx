import {
  fetchPageConfigServer,
  listPublishedRoutes,
} from "@amplifyup/sdk/server";
import { InsightsTestClient } from "../InsightsTestClient";

const PREFIX = "/insights/test";
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

function routeForSlug(slug: string): string {
  return `${PREFIX}/${slug}`;
}

/**
 * Prefetch published AmplifyUP routes under `/insights/test/*`.
 * Soft-fails to [] so build still succeeds if Edge is unreachable.
 */
export async function generateStaticParams() {
  if (!trackingId) return [];

  try {
    const routes = await listPublishedRoutes(trackingId);
    return routes
      .map((route) => route.replace(/\/+$/, "") || "/")
      .filter(
        (route) =>
          route.startsWith(`${PREFIX}/`) && route !== PREFIX
      )
      .map((route) => {
        const rest = route.slice(PREFIX.length + 1);
        const slug = rest.split("/")[0];
        return slug ? { slug } : null;
      })
      .filter((entry): entry is { slug: string } => Boolean(entry?.slug));
  } catch {
    return [];
  }
}

export default async function InsightsTestSlugPage({ params }: Props) {
  const { slug } = await params;
  const route = routeForSlug(slug);

  const pageConfig = trackingId
    ? await fetchPageConfigServer(route, trackingId)
    : null;

  return <InsightsTestClient pageConfig={pageConfig} />;
}
