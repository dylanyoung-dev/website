import { IPost } from "@/interfaces";
import { getPostOgImageUrl } from "@/lib/post-images";
import {
  getSchemaIds,
  PERSON_DESCRIPTION,
  PERSON_JOB_TITLE,
  PROFILE_SAME_AS,
} from "@/lib/schema";

interface StructuredDataProps {
  type: "Person" | "Article" | "Organization" | "BreadcrumbList";
  data?: any;
  post?: IPost;
}

export function StructuredData({ type, data, post }: StructuredDataProps) {
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";
  const siteName = "Dylan Young";
  const { personId, organizationId } = getSchemaIds(baseUrl);

  let jsonLd: Record<string, unknown> = {};

  switch (type) {
    case "Person":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": personId,
        name: "Dylan Young",
        jobTitle: PERSON_JOB_TITLE,
        description: PERSON_DESCRIPTION,
        url: baseUrl,
        image: `${baseUrl}/images/dylan.jpg`,
        sameAs: PROFILE_SAME_AS,
        knowsAbout: [
          "Sitecore",
          "Sitecore Personalize",
          "Composable DXP",
          "Artificial Intelligence",
          "Machine Learning",
          "Model Context Protocol",
          "Node.js",
          "TypeScript",
          ".NET",
        ],
        award: "Sitecore MVP",
        alumniOf: {
          "@type": "Organization",
          name: "Sitecore MVP Program",
        },
      };
      break;

    case "Article":
      if (!post) break;
      {
        const articleUrl = `${baseUrl}/insights/${post.slug.current}/`;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          image: getPostOgImageUrl(post),
          datePublished: post.publishedAt,
          dateModified: post._updatedAt || post.publishedAt,
          url: articleUrl,
          author: { "@id": personId },
          publisher: { "@id": organizationId },
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
          ...(post.categories &&
            post.categories.length > 0 && {
              articleSection: post.categories[0].title,
            }),
        };
      }
      break;

    case "Organization":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": organizationId,
        name: siteName,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.svg`,
        },
        description:
          "Personal blog and portfolio of Dylan Young — 7x Sitecore MVP, Solutions Architect, and AI thought leader.",
        sameAs: PROFILE_SAME_AS,
      };
      break;

    case "BreadcrumbList":
      if (!data?.items) break;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: { name: string; url: string }, index: number) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      };
      break;
  }

  if (!jsonLd["@context"]) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
