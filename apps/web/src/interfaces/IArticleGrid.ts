/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 * Content / CMS-projected fields use SDK `<Field>`; settings (`showFeatured`, etc.) are plain props.
 */

import type { IPost } from "./IPost";

export interface IArticleGrid {
  /** Section heading. */
  heading?: string;
  /** Supporting copy under the heading. */
  description?: string;
  /** Optional sort / meta label (e.g. "Newest first"). */
  sortLabel?: string;
  /** Show "View all" link. Plain prop, not `<Field>`. */
  showViewAll?: boolean;
  /** Href for "View all" (default `/insights/`). Plain prop, not `<Field>`. */
  viewAllHref?: string;
  /** First post uses FeaturedPost layout. Plain prop, not `<Field>`. */
  showFeatured?: boolean;
  /** Edge-resolved posts (CMS connection). */
  posts?: IPost[];
}

export type ArticleGridProps = IArticleGrid;
