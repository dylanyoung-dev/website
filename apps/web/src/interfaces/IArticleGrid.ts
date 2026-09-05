/**
 * AmplifyUP ArticleGrid (`component_id: ArticleGrid`).
 * Content → `fields` envelopes. `postsPagination` → plain prop from Edge.
 */

import type { IAmplifyPost } from "./IAmplifyPost";

export type IArticleGridPost = IAmplifyPost;

export type IArticleGrid = {
  heading?: string;
  description?: string;
  posts?: IAmplifyPost[];
  showFeatured?: boolean;
} & Record<string, unknown>;

export type ArticleGridProps = IArticleGrid;
