/**
 * AmplifyUP / Sanity props for ArticleGrid (`component_id: ArticleGrid`).
 * Import this interface into AmplifyUP to generate registry fields.
 * Site components must read these via SDK `<Field name="…">`.
 */

export type ArticleGridMode = "query" | "curated";

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
  /** Data mode: GROQ query vs curated slug list. */
  mode?: ArticleGridMode;
  /** Posts per page in query mode (default 12). */
  pageSize?: number;
  /** Optional article category slug filter (query mode). */
  categorySlug?: string;
  /** First post uses FeaturedPost layout (query mode). */
  showFeatured?: boolean;
  /** Paginate with `?page=` when true (query mode). */
  showPagination?: boolean;
  /** Ordered Sanity `post.slug.current` values (curated mode). */
  postSlugs?: string[];
}

export type ArticleGridProps = IArticleGrid;
