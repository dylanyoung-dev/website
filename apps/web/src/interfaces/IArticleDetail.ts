/**
 * AmplifyUP props for ArticleDetail (`component_id: ArticleDetail`).
 *
 * Content → SDK `<Field name="post">` / Edge projection.
 */

import type { IAmplifyPost } from "./IAmplifyPost";

export type IArticleDetailPost = IAmplifyPost;

export interface IArticleDetail {
  /** Internal Amplify / Studio label. */
  title?: string;
  /** Edge-resolved post (Field / CMS connection). */
  post?: IArticleDetailPost;
}

export type ArticleDetailProps = IArticleDetail;
