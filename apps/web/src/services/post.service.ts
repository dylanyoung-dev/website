import groq from 'groq';
import client from '../utils/client';
import { IPost, ISlug } from '../interfaces';

export const getPosts = async (count: number = 12, lastId?: string): Promise<IPost[]> => {
    return await client.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...$count]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}`,
        { count }
    );
};

export const getPostBySlug = async (slug: string): Promise<IPost> => {
    return await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}`,
        { slug }
    );
};

export const getAllPostsSlugs = async (): Promise<ISlug[]> => {
    return await client.fetch(groq`*[_type == "post" && defined(slug.current)]{slug}`);
};

export const getPostCategories = async () => {
    return await client.fetch(groq`*[_type == "category"]{...}`);
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
        groq`*[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}`,
        { start, end }
    );
};