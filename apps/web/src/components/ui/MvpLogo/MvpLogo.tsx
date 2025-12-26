"use client";

import Image from "next/image";
import { useState } from "react";

interface MvpLogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  year?: number;
  onError?: () => void;
}

export function MvpLogo({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  year,
  onError 
}: MvpLogoProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return null;
  }

  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={(e) => {
        setHasError(true);
        if (onError) {
          onError();
        }
      }}
    />
  );

  if (year) {
    return (
      <div className="flex flex-col items-center gap-2">
        {image}
        <span className="text-xs text-muted-foreground font-medium">{year}</span>
      </div>
    );
  }

  return image;
}

