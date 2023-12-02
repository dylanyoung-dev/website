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
