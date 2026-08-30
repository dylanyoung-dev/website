import type { Metadata } from "next";
import { fetchPageConfigServer } from "@amplifyup/sdk/server";
import { InsightsPageClient } from "./InsightsPageClient";

const ROUTE = "/insights";
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Dylan Young: Blog Content on AI, Sitecore and Typescript/React",
  description:
    "Explore blog posts and articles covering AI/ML, Sitecore, TypeScript, React, and more",
  alternates: {
    canonical: `${baseUrl}/insights`,
    types: {
      "application/rss+xml": [
        { url: `${baseUrl}/feed.xml`, title: "Dylan Young RSS Feed" },
      ],
    },
  },
};

export default async function InsightsPage() {
  const pageConfig = trackingId
    ? await fetchPageConfigServer(ROUTE, trackingId)
    : null;

  return <InsightsPageClient pageConfig={pageConfig} />;
}
