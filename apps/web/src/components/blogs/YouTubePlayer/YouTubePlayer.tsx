"use client";

import { FC } from "react";
import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

export const YouTubePlayer: FC<YouTubePlayerProps> = ({ videoId }) => {
  return (
    <div className="aspect-video">
      <YouTube videoId={videoId} />
    </div>
  );
};

