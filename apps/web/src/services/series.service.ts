import groq from 'groq';
import { ISeries } from '../interfaces/ISeries';
import client from '../utils/client';

export const getSeries = async (): Promise<ISeries[]> => {
    return await client.fetch(groq`*[_type == "series"] | order(dateReleased desc)`);
};

export const getSeriesBySlug = async (slug: string): Promise<ISeries> => {
    return await client.fetch(
        groq`*[_type == "series" && slug.current == $slug][0]{..., posts[]->{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}}}`,
        { slug }
    );
};

export const getAllSeriesSlugs = async (): Promise<string[]> => {
    return await client.fetch(groq`*[_type == "series" && defined(slug.current)][].slug.current`);
};
