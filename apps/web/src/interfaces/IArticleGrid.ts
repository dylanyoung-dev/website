/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 *
 * Content (`heading`, `description`, `sortLabel`, `posts`) → SDK `<Field>` / Edge projection.
 * Pull & presentation settings → plain props (Composer settings, not click-to-edit Fields).
 */

import type { IPost } from "./IPost";

export type ArticleGridMode = "query" | "curated";

export type ArticleGridSort =
  | "publishedAt_desc"
  | "publishedAt_asc"
  | "title_asc";

export interface IArticleGrid {
  /** Section heading (Field). */
  heading?: string;
  /** Supporting copy (Field). */
  description?: string;
  /** Optional display label e.g. "Newest first" (Field). */
  sortLabel?: string;

  /** Data mode: GROQ query vs curated slug list. Plain setting. */
  mode?: ArticleGridMode;
  /** Sort order for query / resolved lists. Plain setting. */
  sort?: ArticleGridSort;
  /** Posts per page (default 12). Plain setting. */
  pageSize?: number;
  /** Optional article category slug filter (query mode). Plain setting. */
  categorySlug?: string;
  /** Ordered Sanity `post.slug.current` values (curated mode). Plain setting. */
  postSlugs?: string[];
  /** First post uses FeaturedPost layout. Plain setting. */
  showFeatured?: boolean;
  /** Paginate with `?page=` using pageSize. Plain setting. */
  showPagination?: boolean;
  /** Show "View all" link. Plain setting. */
  showViewAll?: boolean;
  /** Href for "View all" (default `/insights/`). Plain setting. */
  viewAllHref?: string;

  /** Edge-resolved posts (Field / CMS connection). */
  posts?: IPost[];
}

export type ArticleGridProps = IArticleGrid;
