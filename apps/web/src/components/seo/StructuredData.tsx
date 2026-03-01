import { IPost } from "@/interfaces";

interface StructuredDataProps {
  type: "Person" | "Article" | "Organization" | "BreadcrumbList";
  data?: any;
  post?: IPost;
}

export function StructuredData({ type, data, post }: StructuredDataProps) {
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";
  const siteName = "Dylan Young";
  
  let jsonLd: any = {};

  switch (type) {
    case "Person":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Dylan Young",
        jobTitle: "Sitecore Developer & Technical Influencer",
        description: "Software engineer and technical influencer specializing in Sitecore, AI/ML, .Net, Python, React, and TypeScript",
        url: baseUrl,
        sameAs: [
          "https://github.com/dylanyoung",
          "https://www.linkedin.com/in/dylanyoung",
          "https://twitter.com/dylanyoung",
        ],
        knowsAbout: [
          "Sitecore",
          "Artificial Intelligence",
          "Machine Learning",
          ".NET",
          "Python",
          "React",
          "TypeScript",
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
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.landscapeImageUrl || post.mainImageUrl,
        datePublished: post.publishedAt,
        dateModified: post._updatedAt || post.publishedAt,
        author: {
          "@type": "Person",
          name: "Dylan Young",
          url: baseUrl,
        },
        publisher: {
          "@type": "Organization",
          name: siteName,
          logo: {
            "@type": "ImageObject",
            url: `${baseUrl}/logo.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${baseUrl}/insights/${post.slug.current}`,
        },
        ...(post.categories && post.categories.length > 0 && {
          articleSection: post.categories[0].title,
        }),
      };
      break;

    case "Organization":
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: baseUrl,
        logo: `${baseUrl}/logo.svg`,
        description: "Personal blog and portfolio of Dylan Young, Sitecore Developer and Technical Influencer",
        sameAs: [
          "https://github.com/dylanyoung",
          "https://www.linkedin.com/in/dylanyoung",
        ],
      };
      break;

    case "BreadcrumbList":
      if (!data?.items) break;
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: data.items.map((item: any, index: number) => ({
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

