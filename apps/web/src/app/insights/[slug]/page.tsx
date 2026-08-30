import groq from "groq";
import type { Metadata } from "next";
import {
  fetchPageConfigServer,
  listPublishedRoutes,
} from "@amplifyup/sdk/server";
import { IPost } from "@/interfaces";
import { getPostOgImageUrl, postImageUrlProjection } from "@/lib/post-images";
import client from "@/utils/client";
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

function toIsoDateString(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.toISOString();
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
        // Skip reserved App Router segments under /insights
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
  const post: IPost | null = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{..., ${postImageUrlProjection}}`,
    { slug }
  );

  const postUrl = `${baseUrl}/insights/${slug}`;

  if (!post) {
    return {
      title: "Insights",
      alternates: { canonical: postUrl },
    };
  }

  const imageUrl = getPostOgImageUrl(post, `${baseUrl}/images/dylan.jpg`)!;
  const ogImageAlt =
    post.socialImage?.alt || post.landscapeImage?.alt || post.title;
  const seoTitle = post.metaTitle || post.title;
  const seoDescription = post.metaDescription || post.excerpt;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: post.categories?.map((cat: { title?: string }) => cat.title).join(", "),
    authors: [{ name: "Dylan Young", url: baseUrl }],
    openGraph: {
      type: "article",
      title: seoTitle,
      description: seoDescription,
      url: postUrl,
      siteName: "Dylan Young",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
      publishedTime: toIsoDateString(post.publishedAt),
      modifiedTime: post._updatedAt ?? toIsoDateString(post.publishedAt),
      authors: ["Dylan Young"],
      ...(post.categories &&
        post.categories.length > 0 && {
          section: post.categories[0].title,
        }),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
      creator: "@dylanyoung_dev",
    },
    alternates: {
      canonical: post.canonicalUrl || postUrl,
    },
  };
}

export default async function InsightsSlugPage({ params }: Props) {
  const { slug } = await params;
  const route = routeForSlug(slug);

  const pageConfig = trackingId
    ? await fetchPageConfigServer(route, trackingId)
    : null;

  return <InsightsPageClient pageConfig={pageConfig} slug={slug} />;
}
