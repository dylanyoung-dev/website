/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 * CMS/list data is resolved on Edge and projected into props — site only reads via `<Field>`.
 */

import type { IPost } from "./IPost";

export interface IArticleGrid {
  /** Section heading. */
  heading?: string;
  /** Supporting copy under the heading. */
  description?: string;
  /** Optional sort / meta label (e.g. "Newest first"). */
  sortLabel?: string;
  /** Show "View all" link. */
  showViewAll?: boolean;
  /** Href for "View all" (default `/insights/`). */
  viewAllHref?: string;
  /** First post uses FeaturedPost layout. */
  showFeatured?: boolean;
  /** Edge-resolved posts (CMS connection). */
  posts?: IPost[];
}

export type ArticleGridProps = IArticleGrid;
