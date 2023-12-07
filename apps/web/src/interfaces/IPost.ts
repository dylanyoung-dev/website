import { ICategory, IImage, ISlug } from '.';

export interface IPost {
    _id: string;
    title: string;
    slug: ISlug;
    mainImage: IImage;
    mainImageUrl: string;
    landscapeImage: IImage;
    landscapeImageUrl: string;
    categories: ICategory[];
    tagging: string[];
    publishedAt: Date;
    readingTime: string;
    body: string;
    excerpt: string;
}
