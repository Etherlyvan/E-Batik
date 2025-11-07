// components/shared/OptimizedImage.tsx - NEW FILE
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  className,
  sizes,
  quality = 75,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f59e0b" offset="20%" />
          <stop stop-color="#d97706" offset="50%" />
          <stop stop-color="#f59e0b" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f59e0b" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `;

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  if (hasError) {
    return (
      <div className={cn("bg-gray-200 flex items-center justify-center", className)}>
        <span className="text-gray-400 text-sm">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width || 700, height || 475))}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={cn(
          "duration-700 ease-in-out",
          isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0",
          fill ? "object-cover" : ""
        )}
      />
    </div>
  );
}