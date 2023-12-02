import { ISlug } from '.';

export interface ICategory {
    _id: string;
    title: string;
    slug: ISlug;
    description: string;
}
