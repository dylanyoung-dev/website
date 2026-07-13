import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Play,
  Video,
} from "lucide-react";
import { YouTubePlayer } from "@/components/blogs/YouTubePlayer";
import { ShareButtons } from "@/components/blogs";
import { InsightsHero } from "@/components/insights";
import { Layout } from "@/components/ui/Layout/Layout";
import { RenderMarkdown } from "@/components/ui/RenderMarkdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getVideoCardImageUrl } from "@/lib/video-images";
import { formatPublishedDate } from "@/lib/utils";
import {
  getAllVideoSlugs,
  getVideoBySlug,
} from "@/services/videoPost.service";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllVideoSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = await getVideoBySlug(slug);
  const baseUrl = process.env.HOST_URL || "https://dylanyoung.dev";

  if (!video) {
    return {
      title: "Video not found",
    };
  }

  const imageUrl = getVideoCardImageUrl(video);

  return {
    title: `${video.title} | Video`,
    description: video.summary || `Watch ${video.title}`,
    openGraph: {
      type: "article",
      title: video.title,
      description: video.summary || `Watch ${video.title}`,
      url: `${baseUrl}/videos/${slug}`,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function VideoDetailPage({ params }: Props) {
  const { slug } = await params;
  const url = process.env.HOST_URL || "";
  const shortPath = `/videos/${slug}/`;
  const fullPath = `${url}${shortPath}`;

  const video = await getVideoBySlug(slug);

  if (!video) {
    notFound();
  }

  const youtubeUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  const channel = video.channel?.[0];
  const releasedLabel = formatPublishedDate(video.dateReleased);
  const ogImageUrl = getVideoCardImageUrl(video);

  return (
    <Layout
      metaTitle={video.title}
      metaDescription={video.summary || `Watch ${video.title}`}
      ogPhoto={ogImageUrl}
      ogUrl={fullPath}
      flushTop
    >
      <section className="bg-background relative">
        <InsightsHero
          eyebrow="Videos"
          title={video.title}
          description={
            video.summary ||
            "Talks, tutorials, and demos from YouTube and beyond."
          }
          showSearch={false}
          showCategoryFilters={false}
        />

        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          <article>
            <div className="mb-8 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-sm font-medium">
                  Video
                </Badge>
                {channel?.title ? (
                  <Badge variant="outline" className="text-sm font-medium">
                    {channel.title}
                  </Badge>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-4 border-t pt-4 md:gap-6">
                {releasedLabel ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <time
                      dateTime={
                        typeof video.dateReleased === "string"
                          ? video.dateReleased
                          : undefined
                      }
                      className="font-medium"
                    >
                      {releasedLabel}
                    </time>
                  </div>
                ) : null}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Video className="h-4 w-4" />
                  <span className="font-medium">Video</span>
                </div>
                <Link
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary no-underline hover:text-primary/80"
                >
                  <Play className="h-4 w-4" />
                  Watch on YouTube
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
                <div className="w-full pt-2 md:ml-auto md:w-auto md:pt-0">
                  <ShareButtons
                    url={fullPath}
                    title={video.title}
                    description={video.summary}
                  />
                </div>
              </div>
            </div>

            {video.youtubeId ? (
              <div className="mb-8">
                <Card className="overflow-hidden border-border/80 shadow-sm">
                  <CardContent className="p-0">
                    <YouTubePlayer videoId={video.youtubeId} />
                  </CardContent>
                </Card>
              </div>
            ) : null}

            {video.body ? (
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div
                    className="prose prose-lg dark:prose-invert max-w-none
                    prose-headings:font-bold prose-headings:text-foreground
                    prose-h2:!mt-20 prose-h2:!mb-8 prose-h2:first:!mt-0
                    prose-h3:!mt-16 prose-h3:!mb-6 prose-h3:first:!mt-0
                    prose-h4:!mt-12 prose-h4:!mb-4 prose-h4:first:!mt-0
                    prose-h5:!mt-10 prose-h5:!mb-3 prose-h5:first:!mt-0
                    prose-h6:!mt-8 prose-h6:!mb-2 prose-h6:first:!mt-0
                    prose-p:text-foreground prose-p:leading-relaxed prose-p:text-lg
                    prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary/80 hover:prose-a:underline
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-code:text-foreground prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                    prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg
                    prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-blockquote:pl-6
                    prose-img:rounded-lg prose-img:shadow-md
                    prose-hr:border-border prose-hr:my-12
                    prose-ul:space-y-2 prose-ol:space-y-2
                    prose-li:text-foreground"
                  >
                    <RenderMarkdown>{video.body}</RenderMarkdown>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            <footer className="mt-12 space-y-6 border-t pt-8">
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link
                    href={youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 no-underline"
                  >
                    <Play className="h-4 w-4" />
                    Watch on YouTube
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                {channel?.channelUrl ? (
                  <Button variant="outline" asChild>
                    <Link
                      href={channel.channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 no-underline"
                    >
                      Visit channel
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                ) : null}
              </div>

              <Button variant="ghost" asChild>
                <Link href="/videos/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Videos
                </Link>
              </Button>
            </footer>
          </article>
        </div>
      </section>
    </Layout>
  );
}
