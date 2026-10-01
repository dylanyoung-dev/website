import type { Metadata } from "next";
import { fetchPageConfigServer } from "@amplifyup/sdk/server";
import { AmplifyRoutePage } from "@/components/amplifyup/AmplifyRoutePage";
import { metadataFromPageConfig } from "@/lib/amplify-meta";

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

// Migration: always resolve at request time so newly published views appear
// without a rebuild. Switch to listPublishedRoutes + revalidate in phase 3.
export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

function routeFromSlug(slug?: string[]): string {
  return slug?.length ? `/${slug.join("/")}` : "/";
}

async function loadPageConfig(route: string) {
  if (!trackingId) return null;
  try {
    return await fetchPageConfigServer(route, trackingId);
  } catch (error) {
    console.error(`[amplifyup] fetchPageConfigServer failed for ${route}`, error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = routeFromSlug(slug);
  const pageConfig = await loadPageConfig(route);

  if (!pageConfig) {
    return {
      title: "Migration to AmplifyUP in progress",
      robots: { index: false, follow: false },
    };
  }

  // Metadata is best-effort: a bad field shape must not 500 the page.
  try {
    const metadata =
      metadataFromPageConfig(pageConfig, { baseUrl, pathname: route }) ?? {};
    if (route !== "/insights") return metadata;

    // Kept from the old /insights route.
    return {
      ...metadata,
      alternates: {
        ...metadata.alternates,
        types: {
          "application/rss+xml": [
            { url: `${baseUrl}/feed.xml`, title: "Dylan Young RSS Feed" },
          ],
        },
      },
    };
  } catch (error) {
    console.error(`[amplifyup] generateMetadata failed for ${route}`, error);
    return {};
  }
}

export default async function AmplifyCatchAllPage({ params }: Props) {
  const { slug } = await params;
  const pageConfig = await loadPageConfig(routeFromSlug(slug));

  // No published view → AmplifyPage renders its MigrationInProgress fallback
  // for visitors (Composer still gets the layout canvas).
  return <AmplifyRoutePage pageConfig={pageConfig} />;
}
