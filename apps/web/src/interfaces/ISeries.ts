import { IPost } from './IPost';
import { ISlug } from './ISlug';

export interface ISeries {
    _id: string;
    title: string;
    description: string;
    slug: ISlug;
    posts: IPost[];
}
