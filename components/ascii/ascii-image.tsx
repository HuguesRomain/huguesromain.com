"use client";

import Image from "next/image";
import { useState } from "react";
import { AsciiCanvas } from "./ascii-canvas";

type AsciiImageProps = {
  src: string;
  alt: string;
  cellSize?: number;
  animated?: boolean;
  speed?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function AsciiImage({
  src,
  alt,
  cellSize = 16,
  animated = true,
  speed = 1,
  className = "",
  sizes = "100vw",
  priority = false,
}: AsciiImageProps) {
  const [asciiReady, setAsciiReady] = useState(false);

  return (
    <div className={`overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-opacity duration-600 ${
          asciiReady ? "opacity-0" : "opacity-35"
        }`}
        style={{ filter: "grayscale(1) brightness(0.45) contrast(1.1)" }}
      />
      <AsciiCanvas
        src={src}
        cellSize={cellSize}
        animated={animated}
        speed={speed}
        className="absolute inset-0"
        onFirstFrame={() => setAsciiReady(true)}
      />
    </div>
  );
}
