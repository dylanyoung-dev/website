"use client";

import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <div className="aspect-video">
      <YouTube videoId={videoId} />
    </div>
  );
}

