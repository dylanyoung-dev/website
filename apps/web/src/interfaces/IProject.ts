import { IImage } from './IImage';
import { ISlug } from './ISlug';

export interface IProject {
    _id: string;
    title: string;
    slug: ISlug;
    thumbnailUrl?: string;
    thumbnail?: IImage;
    short_description?: string;
    github_url?: string;
    project_url?: string;
    technologies?: string[];
    isCurrent?: boolean;
}
