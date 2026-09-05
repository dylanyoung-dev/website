/**
 * AmplifyUP content fields for ArticleDetail (`component_id: ArticleDetail`).
 * Bound via `fields` envelopes — flat From-page / entity projection.
 */

import type { ImageValue } from "@amplifyup/sdk/react";
import type { IAmplifyPostCategory } from "./IAmplifyPost";

export type IArticleDetail = {
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string | null;
  publishedAt?: string;
  readingTime?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  /** Hero image — single Composer-bound image field. */
  landscapeImage?: ImageValue;
  categories?: IAmplifyPostCategory[];
} & Record<string, unknown>;

export type ArticleDetailProps = IArticleDetail;
