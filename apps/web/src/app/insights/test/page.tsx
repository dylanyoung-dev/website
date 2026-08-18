import {
  fetchContentServer,
  resolveAmplifyUpTarget,
  resolveAmplifyUpUrls,
} from "@amplifyup/sdk/server";
import { InsightsTestClient } from "./InsightsTestClient";

const ROUTE = "/insights/test";

/** ISR window matches AmplifyUP Edge resolve cache. */
export const revalidate = 60;

function logAmplifyBuildEnv() {
  const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
  const target = process.env.NEXT_PUBLIC_AMPLIFYUP_TARGET;
  const edgeUrl = process.env.NEXT_PUBLIC_EDGE_URL;
  const resolvedTarget = resolveAmplifyUpTarget();
  const resolved = resolveAmplifyUpUrls(resolvedTarget);

  console.log("[AmplifyUp SSG /insights/test] NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID=", trackingId ?? "(unset)");
  console.log("[AmplifyUp SSG /insights/test] NEXT_PUBLIC_AMPLIFYUP_TARGET=", target ?? "(unset → production)");
  console.log("[AmplifyUp SSG /insights/test] NEXT_PUBLIC_EDGE_URL=", edgeUrl ?? "(unset)");
  console.log(
    "[AmplifyUp SSG /insights/test] resolved target=",
    resolvedTarget,
    "resolved edgeUrl=",
    resolved.edgeUrl
  );
}

/**
 * Dedicated static route (wins over `insights/[slug]`).
 * Pass tracking ID into fetchPageConfigServer — the SDK does not read env itself.
 * Do not pass target/edge URL (production is the default). Do not read searchParams.
 */
export default async function InsightsAmplifyTestPage() {
  logAmplifyBuildEnv();

  const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;

  if (!trackingId) {
    console.warn(
      "[AmplifyUp SSG /insights/test] skipping Edge fetch — NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID is empty"
    );
    return <InsightsTestClient pageConfig={null} />;
  }

  const { pageConfig, meta, error } = await fetchContentServer(
    ROUTE,
    trackingId
  );

  console.log("[AmplifyUp SSG /insights/test] fetch result", {
    source: meta?.source ?? null,
    error: error ?? null,
    pageConfigId: pageConfig?.id ?? null,
    layoutNodes: pageConfig?.layoutTree?.length ?? 0,
  });

  return <InsightsTestClient pageConfig={pageConfig} />;
}
