export interface IVideoPost {
    _id: string;
    title: string;
    youtubeId: string;
    summary: string;
    dateReleased: Date;
    channel: IVideoChannel[];
}

export interface IVideoChannel {
    _id: string;
    title: string;
    channelUrl: string;
}
