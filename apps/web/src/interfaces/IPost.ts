import { ICategory, IImage, ISlug } from '.';

export interface IPost {
    _id: string;
    title: string;
    metaTitle?: string;
    metaDescription?: string;
    slug: ISlug;
    mainImage: IImage;
    mainImageUrl: string;
    landscapeImage: IImage;
    landscapeImageUrl: string;
    socialImage?: IImage;
    socialImageUrl?: string;
    categories: ICategory[];
    tagging: string[];
    publishedAt: Date;
    readingTime: string;
    body: string;
    excerpt: string;
    canonicalUrl: string;
    _updatedAt?: string;
}
