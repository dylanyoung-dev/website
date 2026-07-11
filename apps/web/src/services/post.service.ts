import groq from 'groq';
import client from '../utils/client';
import { ICategory, IPost, ISlug } from '../interfaces';

const postFields = groq`{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}`;

export const getPosts = async (count: number = 12, lastId?: string): Promise<IPost[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$count]${postFields}`,
        { count }
    );
};

export const getPostBySlug = async (slug: string): Promise<IPost> => {
    return await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]${postFields}`,
        { slug }
    );
};

export const getAllPostsSlugs = async (): Promise<ISlug[]> => {
    return await client.fetch(groq`*[_type == "post" && defined(slug.current)]{slug}`);
};

export const getPostCategories = async (): Promise<ICategory[]> => {
    return await client.fetch(
        groq`*[_type == "articleCategory" && defined(slug.current)]{..., "slug": slug}`
    );
};

export const getPostCategoriesByPostCount = async (): Promise<
    Array<ICategory & { postCount: number }>
> => {
    return await client.fetch(
        groq`*[_type == "articleCategory" && defined(slug.current)]{
            ...,
            "slug": slug,
            "postCount": count(*[_type == "post" && defined(slug.current) && references(^._id)])
        } | order(postCount desc, title asc)`
    );
};

export const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
    return await client.fetch(
        groq`*[_type == "articleCategory" && slug.current == $slug][0]{..., "slug": slug}`,
        { slug }
    );
};

export const getPostsByCategorySlug = async (slug: string): Promise<IPost[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current] | order(publishedAt desc)${postFields}`,
        { slug }
    );
};

export const getPostCountByCategorySlug = async (slug: string): Promise<number> => {
    return await client.fetch(
        groq`count(*[_type == "post" && defined(slug.current) && $slug in categories[]->slug.current])`,
        { slug }
    );
};

export const getTotalPostCount = async (): Promise<number> => {
    const result = await client.fetch(
        groq`count(*[_type == "post" && defined(slug.current)])`
    );
    return result;
};

export const getPaginatedPosts = async (page: number = 1, pageSize: number = 12): Promise<IPost[]> => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]${postFields}`,
        { start, end }
    );
};

export const getPostsInRange = async (start: number, end: number): Promise<IPost[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]${postFields}`,
        { start, end }
    );
};

export const getSearchPostCount = async (query: string): Promise<number> => {
    return await client.fetch(
        groq`count(*[_type == "post" && defined(slug.current) && (title match $query + "*" || excerpt match $query + "*")])`,
        { query }
    );
};

export const getSearchPostsInRange = async (
    query: string,
    start: number,
    end: number
): Promise<IPost[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current) && (title match $query + "*" || excerpt match $query + "*")] | order(publishedAt desc)[$start...$end]${postFields}`,
        { query, start, end }
    );
};
