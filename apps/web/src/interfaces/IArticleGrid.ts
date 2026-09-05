/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 * `posts` is a list field — rows arrive as `ListRow<IAmplifyPost>`.
 * Paginated connections also pass `postsPagination` (plain prop).
 */

import type { IAmplifyPost } from "./IAmplifyPost";

export type IArticleGridPost = IAmplifyPost;

export interface IArticleGrid {
  heading?: string;
  description?: string;
  posts?: IAmplifyPost[];
  showFeatured?: boolean;
}

export type ArticleGridProps = IArticleGrid;
