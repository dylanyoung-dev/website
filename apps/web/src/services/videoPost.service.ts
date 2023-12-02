import groq from 'groq';
import { IVideoPost } from '../interfaces';
import client from '../utils/client';

export const getVideoPosts = async (count: number = 12, lastId?: string): Promise<IVideoPost[]> => {
    let result = await client.fetch(groq`*[_type == "videoPost"] | order(dateReleased desc)[0...$count]{..., channel[]->{...}}`, {
        count
    });
    console.log(result);

    return result;
};
