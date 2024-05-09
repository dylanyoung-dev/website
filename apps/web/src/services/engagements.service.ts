import groq from 'groq';
import { IEngagement } from '../interfaces/IEngagement';
import client from '../utils/client';

export const getEngagements = async (count: number = 24, lastId?: string): Promise<IEngagement[]> => {
    return await client.fetch(
        groq`*[_type == "speaking" && defined(slug.current)] | order(publishedAt desc)[0...$count]{..., "thumbnailUrl": thumbnail.asset->url, posts[]->{...}}`,
        { count }
    );
};

export const getEngagementBySlug = async (slug: string): Promise<IEngagement> => {
    return await client.fetch(
        groq`*[_type == "speaking" && slug.current == $slug][0]{..., "thumbnailUrl": thumbnail.asset->url, posts[]->{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}}`,
        { slug }
    );
};

export const getAllEngagementSlugs = async (): Promise<string[]> => {
    return await client.fetch(groq`*[_type == "speaking" && defined(slug.current)][].slug.current`);
};
