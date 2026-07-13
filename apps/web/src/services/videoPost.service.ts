import groq from 'groq';
import { IVideoPost } from '../interfaces';
import client from '../utils/client';

const videoPostFields = groq`{..., "landscapeImageUrl": landscapeImage.asset->url, channel[]->{...}}`;

export const getTotalVideoCount = async (): Promise<number> => {
    return await client.fetch(groq`count(*[_type == "videoPost" && defined(youtubeId)])`);
};

export const getVideoPosts = async (count: number = 12): Promise<IVideoPost[]> => {
    return await client.fetch(
        groq`*[_type == "videoPost" && defined(youtubeId)] | order(dateReleased desc)[0...$count]${videoPostFields}`,
        { count }
    );
};

export const getVideosInRange = async (start: number, end: number): Promise<IVideoPost[]> => {
    return await client.fetch(
        groq`*[_type == "videoPost" && defined(youtubeId)] | order(dateReleased desc)[$start...$end]${videoPostFields}`,
        { start, end }
    );
};

export const getSearchVideoCount = async (query: string): Promise<number> => {
    return await client.fetch(
        groq`count(*[_type == "videoPost" && defined(youtubeId) && (title match $query + "*" || summary match $query + "*" || body match $query + "*")])`,
        { query }
    );
};

export const getSearchVideosInRange = async (
    query: string,
    start: number,
    end: number
): Promise<IVideoPost[]> => {
    return await client.fetch(
        groq`*[_type == "videoPost" && defined(youtubeId) && (title match $query + "*" || summary match $query + "*" || body match $query + "*")] | order(dateReleased desc)[$start...$end]${videoPostFields}`,
        { query, start, end }
    );
};

export const getVideoBySlug = async (slug: string): Promise<IVideoPost | null> => {
    return await client.fetch(
        groq`*[_type == "videoPost" && (slug.current == $slug || youtubeId == $slug)][0]${videoPostFields}`,
        { slug }
    );
};

export const getAllVideoSlugs = async (): Promise<string[]> => {
    try {
        const videos = await client.fetch(
            groq`*[_type == "videoPost" && defined(youtubeId)]{
                "slug": coalesce(slug.current, youtubeId)
            }.slug`
        );

        return Array.isArray(videos) ? videos.filter(Boolean) : [];
    } catch {
        return [];
    }
};
