"use client";

import type { Fields, ImageValue, ListRow } from "@amplifyup/sdk/react";
import { Calendar, Play } from "lucide-react";
import { YouTubePlayer } from "@/components/blogs/YouTubePlayer/YouTubePlayer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { DetailLayout, MetaItem, MetaLink } from "@/components/amplifyup/internal/DetailLayout";
import { plainSlug } from "@/components/amplifyup/internal/fields";
import { formatPublishedDate } from "@/lib/utils";

type Channel = { title: string; channelUrl?: string };

/** Sanity `videoPost` document, projected From page. */
type VideoPost = {
  title: string;
  slug: string;
  youtubeId: string;
  landscapeImage: ImageValue;
  summary: string;
  /** Markdown. */
  body: string;
  dateReleased: string;
  channel: Channel[];
};

/**
 * AmplifyUP placeable `VideoDetail` (/videos/[slug]). Fields come From page
 * (Sanity `videoPost`). The player replaces the image when there's a YouTube id.
 */
export function VideoDetail({ fields }: { fields: Fields<VideoPost> }) {
  const slug = plainSlug(fields.slug);
  const youtubeId = fields.youtubeId?.value?.trim();
  const released = fields.dateReleased?.value;
  const releasedLabel = formatPublishedDate(released);
  const channel = ((fields.channel?.value ?? []) as ListRow<Channel>[])[0];

  return (
    <DetailLayout
      section={{ label: "Videos", href: "/videos/" }}
      path={`/videos/${slug}/`}
      title={fields.title}
      summary={fields.summary}
      body={fields.body}
      image={youtubeId ? undefined : fields.landscapeImage}
      badges={
        <>
          <Badge variant="secondary" className="text-sm font-medium">
            Video
          </Badge>
          {channel?.title?.value ? (
            <Badge variant="outline" className="text-sm font-medium">
              {channel.title.value}
            </Badge>
          ) : null}
        </>
      }
      meta={
        <>
          {releasedLabel && released ? (
            <MetaItem icon={<Calendar className="h-4 w-4" />}>
              <time dateTime={released}>{releasedLabel}</time>
            </MetaItem>
          ) : null}
          {youtubeId ? (
            <MetaLink
              href={`https://www.youtube.com/watch?v=${youtubeId}`}
              icon={<Play className="h-4 w-4" />}
            >
              Watch on YouTube
            </MetaLink>
          ) : null}
        </>
      }
      media={
        youtubeId ? (
          <Card className="overflow-hidden border-border/80 shadow-sm">
            <CardContent className="p-0">
              <YouTubePlayer videoId={youtubeId} />
            </CardContent>
          </Card>
        ) : null
      }
    />
  );
}
