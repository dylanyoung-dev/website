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

export const videoImageUrlProjection = `"landscapeImageUrl": landscapeImage.asset->url`;
