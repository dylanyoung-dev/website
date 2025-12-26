"use client";

import YouTube from "react-youtube";

interface YouTubePlayerProps {
  videoId: string;
}

export function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg relative">
      <div className="absolute inset-0">
        <YouTube 
          videoId={videoId}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              modestbranding: 1,
            },
          }}
        />
      </div>
    </div>
  );
}

