"use client";

import { LinkedinShareButton } from "next-share";
import { Share2, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const handleGeneralShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url,
        });
      } catch (err) {
        // User cancelled or error occurred
        console.log("Share cancelled or failed");
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could add a toast notification here
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link");
      }
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={handleGeneralShare}
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <LinkedinShareButton url={url} title={title} summary={description}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
      </LinkedinShareButton>
    </div>
  );
}

