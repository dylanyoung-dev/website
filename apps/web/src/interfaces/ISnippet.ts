import { ISlug } from "./ISlug";

export interface ISnippetCategory {
  _id: string;
  title: string;
  description?: string;
}

export interface ISnippetTag {
  _id: string;
  title: string;
}

export interface ISnippet {
  _id: string;
  title: string;
  slug: ISlug;
  excerpt?: string;
  publishedAt?: Date | string;
  body: string;
  categories?: ISnippetCategory[];
  tagging?: ISnippetTag[];
}
