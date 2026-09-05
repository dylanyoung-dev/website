/**
 * AmplifyUP content fields for ArticleMeta (`component_id: ArticleMeta`).
 * Flat From-page / entity projection — same field names as ArticleDetail SEO.
 */

import type { ImageValue } from "@amplifyup/sdk/react";
import type { IAmplifyPostCategory } from "./IAmplifyPost";

export type IArticleMeta = {
  metaTitle?: string;
  metaDescription?: string;
  excerpt?: string;
  title?: string;
  slug?: string;
  publishedAt?: string;
  canonicalUrl?: string;
  landscapeImage?: ImageValue;
  socialImage?: ImageValue;
  categories?: IAmplifyPostCategory[];
} & Record<string, unknown>;

export type ArticleMetaProps = IArticleMeta;
