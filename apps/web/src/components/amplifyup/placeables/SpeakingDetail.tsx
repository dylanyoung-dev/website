"use client";

import type { Fields, ImageValue, ListRow } from "@amplifyup/sdk/react";
import { FileText, MapPin, Mic, Presentation, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardGridSection, ContentCard } from "@/components/amplifyup/internal/ContentCard";
import { DetailLayout, MetaItem, MetaLink } from "@/components/amplifyup/internal/DetailLayout";
import { plainSlug } from "@/components/amplifyup/internal/fields";

type RelatedPost = {
  title: string;
  slug: string;
  landscapeImage?: ImageValue;
  excerpt?: string;
};

/** Sanity `speaking` document, projected From page. */
type Speaking = {
  title: string;
  slug: string;
  thumbnail: ImageValue;
  short_description: string;
  location: string;
  slides_link: string;
  video_link: string;
  /** Markdown. */
  details: string;
  posts: RelatedPost[];
};

/**
 * AmplifyUP placeable `SpeakingDetail` (/speaking/[slug]). Fields come From
 * page (Sanity `speaking`), including the related `posts`.
 */
export function SpeakingDetail({ fields }: { fields: Fields<Speaking> }) {
  const slug = plainSlug(fields.slug);
  const location = fields.location?.value;
  const slides = fields.slides_link?.value;
  const video = fields.video_link?.value;
  const posts = (fields.posts?.value ?? []) as ListRow<RelatedPost>[];

  return (
    <DetailLayout
      section={{ label: "Speaking", href: "/speaking/" }}
      path={`/speaking/${slug}/`}
      title={fields.title}
      summary={fields.short_description}
      body={fields.details}
      image={fields.thumbnail}
      badges={
        <>
          <Badge variant="secondary" className="text-sm font-medium">
            Speaking
          </Badge>
          {location ? (
            <Badge variant="outline" className="text-sm font-medium">
              {location}
            </Badge>
          ) : null}
        </>
      }
      meta={
        <>
          {location ? (
            <MetaItem icon={<MapPin className="h-4 w-4" />}>{location}</MetaItem>
          ) : null}
          <MetaItem icon={<Mic className="h-4 w-4" />}>Session</MetaItem>
          {slides ? (
            <MetaLink href={slides} icon={<Presentation className="h-4 w-4" />}>
              View slides
            </MetaLink>
          ) : null}
          {video ? (
            <MetaLink href={video} icon={<Video className="h-4 w-4" />}>
              Watch recording
            </MetaLink>
          ) : null}
        </>
      }
      after={
        posts.length ? (
          <div className="border-t">
            <CardGridSection
              heading="Related Content"
              description="Curated articles and resources for this session"
              isEmpty={false}
              emptyMessage=""
              emptyIcon={null}
            >
              {posts.map((post) => (
                <ContentCard
                  key={post.id}
                  href={`/insights/${plainSlug(post.slug)}/`}
                  title={post.title}
                  description={post.excerpt}
                  image={post.landscapeImage}
                  fallbackIcon={<FileText className="h-10 w-10" />}
                  ctaLabel="Read article"
                />
              ))}
            </CardGridSection>
          </div>
        ) : null
      }
    />
  );
}
