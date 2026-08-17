/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 *
 * Content → SDK `<Field>` / Edge projection.
 * Presentation settings → plain props.
 * List pull is owned by AmplifyUP / Edge.
 */

export interface IArticleGridImage {
  url: string;
  assetId?: string;
  width?: number;
  height?: number;
  alt?: string;
}

export interface IArticleGridReference {
  id: string;
  type?: string;
}

/**
 * Post shape projected by AmplifyUP (not the Sanity GROQ `IPost` used elsewhere).
 * `slug` is a string; images expose `url` directly; categories/tags are unresolved refs.
 */
export interface IArticleGridPost {
  _id: string;
  id?: string;
  _type?: string;
  title: string;
  slug: string;
  mainImage?: IArticleGridImage;
  landscapeImage?: IArticleGridImage;
  categories?: IArticleGridReference[];
  tagging?: IArticleGridReference[] | string[];
  publishedAt?: string;
  body?: string;
  readingTime?: string;
  excerpt?: string;
}

export interface IArticleGrid {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Section heading (Field). */
  heading?: string;
  /** Supporting copy (Field). */
  description?: string;
  /** Optional display label e.g. "Newest first" (Field). */
  sortLabel?: string;

  /** First post uses featured layout. Plain setting. */
  showFeatured?: boolean;
  /** Show "View all" link. Plain setting. */
  showViewAll?: boolean;
  /** Href for "View all" (default `/insights/`). Plain setting. */
  viewAllHref?: string;

  /** Edge-resolved posts (Field / CMS connection). */
  posts?: IArticleGridPost[];
}

export type ArticleGridProps = IArticleGrid;
