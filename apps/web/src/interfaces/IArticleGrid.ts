/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 *
 * Content → SDK `<Field>` / Edge projection.
 * Presentation settings → plain props.
 * List pull (query vs curated, filters, sort, page size) is owned by AmplifyUP / Edge.
 */

import type { IPost } from "./IPost";

export interface IArticleGrid {
  /** Section heading (Field). */
  heading?: string;
  /** Supporting copy (Field). */
  description?: string;
  /** Optional display label e.g. "Newest first" (Field). */
  sortLabel?: string;

  /** First post uses FeaturedPost layout. Plain setting. */
  showFeatured?: boolean;
  /** Show "View all" link. Plain setting. */
  showViewAll?: boolean;
  /** Href for "View all" (default `/insights/`). Plain setting. */
  viewAllHref?: string;

  /** Edge-resolved posts (Field / CMS connection). */
  posts?: IPost[];
}

export type ArticleGridProps = IArticleGrid;
