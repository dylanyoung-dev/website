/**
 * AmplifyUP props for ArticleGrid (`component_id: ArticleGrid`).
 *
 * Content → SDK `<Field>` / Edge projection.
 * Presentation settings → plain props.
 * List pull is owned by AmplifyUP / Edge.
 */

import type { IAmplifyPost } from "./IAmplifyPost";

/** @deprecated Prefer `IAmplifyPost` — kept as an alias for ArticleGrid imports. */
export type IArticleGridPost = IAmplifyPost;
export type { IAmplifyPostImage as IArticleGridImage } from "./IAmplifyPost";
export type { IAmplifyPostCategory as IArticleGridReference } from "./IAmplifyPost";

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
  posts?: IAmplifyPost[];
}

export type ArticleGridProps = IArticleGrid;
