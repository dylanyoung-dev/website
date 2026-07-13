import { IImage } from "./IImage";
import { ISlug } from "./ISlug";

export interface IVideoPost {
    _id: string;
    title: string;
    slug?: ISlug;
    youtubeId: string;
    landscapeImage?: IImage;
    landscapeImageUrl?: string;
    summary: string;
    body?: string;
    dateReleased: Date;
    channel: IVideoChannel[];
}

export interface IVideoChannel {
    _id: string;
    title: string;
    channelUrl: string;
}
