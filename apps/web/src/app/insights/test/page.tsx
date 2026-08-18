import { fetchPageConfigServer } from "@amplifyup/sdk/server";
import { InsightsTestClient } from "./InsightsTestClient";

const ROUTE = "/insights/test";
const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;

export const revalidate = 60;

export default async function InsightsTestPage() {
  const pageConfig = trackingId
    ? await fetchPageConfigServer(ROUTE, trackingId)
    : null;

  return <InsightsTestClient pageConfig={pageConfig} />;
}
