import { NextResponse, type NextRequest } from "next/server";
import { listPublishedRoutes } from "@amplifyup/sdk/server";

/**
 * Migration gate: any non-legacy route without a published AmplifyUP view gets a 503
 * (Retry-After: 1h) so crawlers back off instead of indexing the migration
 * page. Remove in phase 3 once every view is published.
 */

const trackingId = process.env.NEXT_PUBLIC_AMPLIFYUP_TRACKING_ID;
const CACHE_TTL_MS = 60_000;

/**
 * Sections still served by legacy `app/<section>/page.tsx` routes — never
 * gated. Remove a prefix when its legacy route is deleted and the view is
 * published in AmplifyUP.
 */
const LEGACY_PREFIXES = [
  "/about",
  "/contact",
  "/apps",
  "/up-to",
  "/speaking",
  "/videos",
  "/snippets",
  "/insights/series",
];

function isLegacyRoute(path: string): boolean {
  return LEGACY_PREFIXES.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );
}

let cached: { routes: Set<string>; expires: number } | null = null;
let inflight: Promise<Set<string>> | null = null;

function normalize(path: string): string {
  return path.replace(/\/+$/, "") || "/";
}

async function publishedRoutes(): Promise<Set<string>> {
  if (cached && cached.expires > Date.now()) return cached.routes;
  if (!inflight) {
    inflight = listPublishedRoutes(trackingId!)
      .then((routes) => {
        const set = new Set(routes.map(normalize));
        // Empty usually means Edge was unreachable (the SDK soft-fails to []);
        // don't cache it so the next request retries.
        if (set.size) cached = { routes: set, expires: Date.now() + CACHE_TTL_MS };
        return set;
      })
      .catch(() => new Set<string>())
      .finally(() => {
        inflight = null;
      });
  }
  return inflight;
}

const MIGRATION_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Migration to AmplifyUP in progress</title>
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:0 16px}</style>
</head>
<body>
<main>
<h1>Migration to AmplifyUP in progress</h1>
<p>This page is being rebuilt. Please check back shortly.</p>
</main>
</body>
</html>`;

export async function middleware(request: NextRequest) {
  // Composer preview must reach the page to edit unpublished views.
  const path = normalize(request.nextUrl.pathname);
  if (
    !trackingId ||
    request.nextUrl.searchParams.has("preview") ||
    isLegacyRoute(path)
  ) {
    return NextResponse.next();
  }

  const routes = await publishedRoutes();
  // Fail open: if Edge is down, let the page render (it falls back to the
  // noindex MigrationInProgress) rather than 503 the whole site.
  if (!routes.size || routes.has(path)) {
    return NextResponse.next();
  }

  return new NextResponse(MIGRATION_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Retry-After": "3600",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}

export const config = {
  // Skip API, Next internals, Studio, and anything with a file extension
  // (static assets, feed.xml, sitemap*.xml, robots.txt, __forms.html, …).
  matcher: ["/((?!api/|_next/|studio(?:/|$)|.*\\.[^/]+$).*)"],
};
