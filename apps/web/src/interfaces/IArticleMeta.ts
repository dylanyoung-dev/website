/**
 * AmplifyUP props for ArticleMeta (`component_id: ArticleMeta`).
 * SEO metadata derived from an Edge-projected post (same binding pattern as ArticleDetail).
 */

import type { IAmplifyPost } from "./IAmplifyPost";

export type IArticleMetaPost = IAmplifyPost;

export interface IArticleMeta {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Edge-resolved post when bound as a single entity field. */
  post?: IArticleMetaPost;
  /** Flat entity projection overrides / "From page" fields. */
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  slug?: string;
  publishedAt?: string;
  canonicalUrl?: string;
  mainImage?: IAmplifyPost["mainImage"];
  landscapeImage?: IAmplifyPost["landscapeImage"];
  socialImage?: IAmplifyPost["socialImage"];
  categories?: IAmplifyPost["categories"];
}

export type ArticleMetaProps = IArticleMeta;
