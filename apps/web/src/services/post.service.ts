import groq from 'groq';
import { IPost, ISlug } from '../interfaces';
import client from '../utils/client';

export interface IPagination<T> {
    data: T[];
    totalCount: number;
    lastId: string;
    lastPublishedAt: string;
}

export const getPosts = async (count: number = 12, lastId?: string, lastPublishedAt?: string): Promise<IPagination<IPost>> => {
    const params = {
        count,
        lastPublishedAt: lastPublishedAt ?? '',
        lastId: lastId ?? ''
    };

    let filter = '';
    if (lastPublishedAt != undefined && lastId != undefined) {
        filter = `publishedAt > "${lastPublishedAt}" || (publishedAt == "${lastPublishedAt}" && _id > "${lastId}") &&`;
    }

    const query = `{
        "data": *[_type == "post" && ${filter} defined(slug.current)] | order(publishedAt desc, _id asc)[0...$count]{..., "mainImageUrl": mainImage.asset->url, "landscapeImageUrl": landscapeImage.asset->url, categories[]->{...}, tagging[]->{...}},
        "totalCount": count(*[_type == "post" && defined(slug.current)])
    }`;

    console.log(query);

    const results = await client.fetch(groq`${query}`, params);

    const data = results.data;
    const totalCount = results.totalCount;
    const lastPost = data[data.length - 1];

    return {
        data: data as IPost[],
        totalCount,
        lastId: lastPost?._id,
        lastPublishedAt: lastPost?.publishedAt
    };
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
