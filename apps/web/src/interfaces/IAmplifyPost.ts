/**
 * AmplifyUP Edge-projected post shape (not Sanity GROQ `IPost`).
 * Shared by ArticleGrid, ArticleDetail, and related placeables.
 *
 * In placeables, list items arrive as `ListRow<IAmplifyPost>` (enveloped fields
 * + plain `id` / `slug`). Page-level From-page fields stay flat envelopes on
 * `fields.*`.
 */

import type { ImageValue } from "@amplifyup/sdk/react";

export type IAmplifyPostImage = ImageValue;

/** Category/tag as Edge may project — list row schema includes plain `id`. */
export type IAmplifyPostCategory = {
  id: string;
  _id?: string;
  type?: string;
  title?: string;
  slug?: string | { current?: string };
};

/** Post schema. List usage: `ListRow<IAmplifyPost>` from `fields.posts.value`. */
export type IAmplifyPost = {
  id: string;
  _id?: string;
  _type?: string;
  title: string;
  slug: string;
  mainImage?: ImageValue;
  landscapeImage?: ImageValue;
  socialImage?: ImageValue;
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
};
