import groq from "groq";
import { ISnippet } from "../interfaces/ISnippet";
import client from "../utils/client";

const snippetFields = groq`{
  ...,
  categories[]->{ _id, title, description },
  tagging[]->{ _id, title }
}`;

export const getSnippets = async (): Promise<ISnippet[]> => {
  return await client.fetch(
    groq`*[_type == "snippet" && defined(slug.current)] | order(publishedAt desc)${snippetFields}`
  );
};

export const getSnippetBySlug = async (slug: string): Promise<ISnippet | null> => {
  return await client.fetch(
    groq`*[_type == "snippet" && slug.current == $slug][0]${snippetFields}`,
    { slug }
  );
};

export const getAllSnippetSlugs = async (): Promise<string[]> => {
  try {
    const slugs = await client.fetch(
      groq`*[_type == "snippet" && defined(slug.current)][].slug.current`
    );

    return Array.isArray(slugs) ? slugs : [];
  } catch {
    return [];
  }
};
