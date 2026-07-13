import { IVideoPost } from "@/interfaces";

export function getYouTubeThumbnailUrl(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function getVideoCardImageUrl(
  video: Pick<IVideoPost, "landscapeImageUrl" | "youtubeId">
): string {
  return video.landscapeImageUrl || getYouTubeThumbnailUrl(video.youtubeId);
}

export function getVideoCardImageAlt(video: IVideoPost): string {
  return video.landscapeImage?.alt ?? video.title;
}

export function getVideoDetailPath(video: Pick<IVideoPost, "slug" | "youtubeId">): string {
  const slug = video.slug?.current || video.youtubeId;
  return `/videos/${slug}/`;
}

export const videoImageUrlProjection = `"landscapeImageUrl": landscapeImage.asset->url`;
