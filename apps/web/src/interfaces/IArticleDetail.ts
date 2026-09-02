/**
 * AmplifyUP props for ArticleDetail (`component_id: ArticleDetail`).
 *
 * Content → `<Field value={post}>` and/or flat Edge entity props (title, body, slug, …).
 */

import type { IAmplifyPost } from "./IAmplifyPost";

export type IArticleDetailPost = IAmplifyPost;

export interface IArticleDetail {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Edge-resolved post object when bound as a single entity field. */
  post?: IArticleDetailPost;
  /** Flat entity projection (Amplify "From page" may map fields at the prop root). */
  excerpt?: string;
  body?: string;
  slug?: string;
  publishedAt?: string;
  readingTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  mainImage?: IAmplifyPost["mainImage"];
  landscapeImage?: IAmplifyPost["landscapeImage"];
  socialImage?: IAmplifyPost["socialImage"];
  categories?: IAmplifyPost["categories"];
}

export type ArticleDetailProps = IArticleDetail;
