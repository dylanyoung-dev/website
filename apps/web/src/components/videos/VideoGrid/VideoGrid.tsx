import Image from "next/image";
import Link from "next/link";
import { Play, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { IVideoPost } from "@/interfaces";
import {
  getVideoCardImageAlt,
  getVideoCardImageUrl,
  getVideoDetailPath,
} from "@/lib/video-images";
import { formatPublishedDate } from "@/lib/utils";

interface VideoGridProps {
  videos: IVideoPost[];
  title?: string;
  description?: string;
  sortLabel?: string;
  emptyMessage?: string;
}

function VideoCard({ video }: { video: IVideoPost }) {
  const detailHref = getVideoDetailPath(video);
  const thumbnailUrl = getVideoCardImageUrl(video);
  const thumbnailAlt = getVideoCardImageAlt(video);
  const channel = video.channel?.[0]?.title;
  const releasedLabel = formatPublishedDate(video.dateReleased, "MMM dd, yyyy");

  return (
    <Card className="group h-full overflow-hidden border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="flex h-full flex-col p-0">
        <Link href={detailHref} className="flex h-full flex-col no-underline">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            <Image
              src={thumbnailUrl}
              alt={thumbnailAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-slate-950/20 transition-colors group-hover:bg-slate-950/35"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-lg transition-transform group-hover:scale-110">
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 p-5">
            {channel ? (
              <span className="text-[0.65rem] font-semibold uppercase tracking-wider text-primary">
                {channel}
              </span>
            ) : null}
            <h3 className="text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
              {video.title}
            </h3>
            {video.summary ? (
              <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {video.summary}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between border-t px-5 py-3.5 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
            {releasedLabel ? (
              <time dateTime={String(video.dateReleased)}>{releasedLabel}</time>
            ) : (
              <span>&nbsp;</span>
            )}
            <span>View video</span>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}

export function VideoGrid({
  videos,
  title = "All Videos",
  description = "Talks, tutorials, and demos across YouTube channels",
  sortLabel = "Sorted by newest",
  emptyMessage = "No videos available yet.",
}: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <Card className="border-border/80">
        <CardContent className="py-12 text-center">
          <Video className="mx-auto mb-3 h-8 w-8 text-muted-foreground/60" aria-hidden />
          <p className="text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {sortLabel ? (
          <span className="hidden shrink-0 text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
            {sortLabel}
          </span>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </section>
  );
}
