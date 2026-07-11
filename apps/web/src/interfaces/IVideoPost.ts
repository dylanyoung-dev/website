import { IImage } from "./IImage";

export interface IVideoPost {
    _id: string;
    title: string;
    youtubeId: string;
    landscapeImage?: IImage;
    landscapeImageUrl?: string;
    summary: string;
    dateReleased: Date;
    channel: IVideoChannel[];
}

export interface IVideoChannel {
    _id: string;
    title: string;
    channelUrl: string;
}
