import { IImage } from './IImage';
import { IPost } from './IPost';
import { ISlug } from './ISlug';

export interface IEngagement {
    _id: string;
    title: string;
    slug: ISlug;
    thumbnailUrl: string;
    thumbnail: IImage;
    short_description: string;
    location: string;
    slides_link: string;
    video_link: string;
    details: string;
    posts: IPost[];
}
