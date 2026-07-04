import { IPost } from "@/interfaces";

const postImageFields = [
  "socialImageUrl",
  "landscapeImageUrl",
  "mainImageUrl",
] as const;

type PostImageFields = Pick<IPost, (typeof postImageFields)[number]>;

export function getPostOgImageUrl(
  post: PostImageFields,
  fallback?: string
): string | undefined {
  return post.socialImageUrl || post.landscapeImageUrl || post.mainImageUrl || fallback;
}

export const postImageUrlProjection = `
  "mainImageUrl": mainImage.asset->url,
  "landscapeImageUrl": landscapeImage.asset->url,
  "socialImageUrl": socialImage.asset->url
`;
