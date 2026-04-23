"use client";

import Image from "next/image";
import { useState } from "react";

interface StartupLogoProps {
  src: string;
  alt: string;
  size?: "sm" | "md";
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export default function StartupLogo({ src, alt, size = "sm" }: StartupLogoProps) {
  const [ratio, setRatio] = useState(1.8);
  const heightPx = size === "sm" ? 16 : 20;
  const maxWidthPx = size === "sm" ? 60 : 84;
  const widthPx = clamp(Math.round(heightPx * ratio), heightPx, maxWidthPx);

  return (
    <div className="shrink-0 relative" style={{ width: widthPx, height: heightPx }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={`${maxWidthPx}px`}
        className="object-contain"
        onLoad={(e) => {
          const img = e.currentTarget;
          setRatio((img.naturalWidth || 1) / (img.naturalHeight || 1));
        }}
      />
    </div>
  );
}
