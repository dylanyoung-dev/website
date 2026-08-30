import type { Metadata } from "next";
import { fetchPageConfigServer } from "@amplifyup/sdk/server";
import { metadataFromPageConfig } from "@/lib/amplify-meta";
import { InsightsPageClient } from "./InsightsPageClient";

const ROUTE = "/insights";
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageConfig = trackingId
    ? await fetchPageConfigServer(ROUTE, trackingId)
    : null;

  const fromEdge = metadataFromPageConfig(pageConfig, {
    baseUrl,
    pathname: "/insights",
  });

  if (!fromEdge) return {};

  return {
    ...fromEdge,
    alternates: {
      ...fromEdge.alternates,
      types: {
        "application/rss+xml": [
          { url: `${baseUrl}/feed.xml`, title: "Dylan Young RSS Feed" },
        ],
      },
    },
  };
}

export default async function InsightsPage() {
  const pageConfig = trackingId
    ? await fetchPageConfigServer(ROUTE, trackingId)
    : null;

  return <InsightsPageClient pageConfig={pageConfig} />;
}
