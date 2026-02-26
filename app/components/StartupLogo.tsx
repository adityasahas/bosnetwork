"use client";

import Image from "next/image";
import { useState } from "react";

interface StartupLogoProps {
  src: string;
  alt: string;
  size?: "sm" | "md";
}

type LogoTone = "lightPlate" | "darkPlate" | "neutralPlate";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export default function StartupLogo({ src, alt, size = "sm" }: StartupLogoProps) {
  const [ratio, setRatio] = useState(1.8);
  const [tone, setTone] = useState<LogoTone>("neutralPlate");
  const heightPx = size === "sm" ? 16 : 20;
  const maxWidthPx = size === "sm" ? 60 : 84;
  const widthPx = clamp(Math.round(heightPx * ratio), heightPx, maxWidthPx);

  const plateClass =
    tone === "lightPlate"
      ? "bg-[#e7e2d9] border-[#c8c1b5]"
      : tone === "darkPlate"
        ? "bg-[#1a1714] border-border/70"
        : "bg-surface border-border/50";

  return (
    <div
      className={`shrink-0 rounded-sm border p-0.5 ${plateClass}`}
      style={{ width: `${widthPx}px`, height: `${heightPx}px` }}
    >
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`${maxWidthPx}px`}
          crossOrigin="anonymous"
          className="object-contain"
          onLoad={(event) => {
            const image = event.currentTarget;
            const naturalWidth = image.naturalWidth || 1;
            const naturalHeight = image.naturalHeight || 1;
            setRatio(naturalWidth / naturalHeight);

            try {
              const sampleSize = 36;
              const canvas = document.createElement("canvas");
              canvas.width = sampleSize;
              canvas.height = sampleSize;
              const context = canvas.getContext("2d");
              if (!context) return;

              context.drawImage(image, 0, 0, sampleSize, sampleSize);
              const { data } = context.getImageData(0, 0, sampleSize, sampleSize);

              let visiblePixels = 0;
              let luminanceTotal = 0;

              for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];
                if (a < 20) continue;
                visiblePixels += 1;
                luminanceTotal += 0.2126 * r + 0.7152 * g + 0.0722 * b;
              }

              if (visiblePixels === 0) {
                setTone("neutralPlate");
                return;
              }

              const totalPixels = sampleSize * sampleSize;
              const transparencyRatio = 1 - visiblePixels / totalPixels;
              const averageLuminance = luminanceTotal / visiblePixels;

              if (transparencyRatio > 0.25 || averageLuminance < 90) {
                setTone("lightPlate");
              } else if (averageLuminance > 190) {
                setTone("darkPlate");
              } else {
                setTone("neutralPlate");
              }
            } catch {
              setTone("neutralPlate");
            }
          }}
        />
      </div>
    </div>
  );
}
