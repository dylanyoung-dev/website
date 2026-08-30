/**
 * AmplifyUP Edge-projected post shape (not Sanity GROQ `IPost`).
 * Shared by ArticleGrid, ArticleDetail, and related placeables.
 */

export interface IAmplifyPostImage {
  url: string;
  assetId?: string;
  width?: number;
  height?: number;
  alt?: string;
}

/** Category/tag as Edge may project — refs only, or resolved title/slug when available. */
export interface IAmplifyPostCategory {
  id?: string;
  _id?: string;
  type?: string;
  title?: string;
  slug?: string | { current?: string };
}

export interface IAmplifyPost {
  _id?: string;
  id?: string;
  _type?: string;
  title: string;
  slug: string;
  mainImage?: IAmplifyPostImage;
  landscapeImage?: IAmplifyPostImage;
  socialImage?: IAmplifyPostImage;
  categories?: IAmplifyPostCategory[];
  tagging?: IAmplifyPostCategory[] | string[];
  publishedAt?: string;
  body?: string;
  readingTime?: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  _updatedAt?: string;
}
