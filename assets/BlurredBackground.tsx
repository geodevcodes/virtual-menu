"use client";
import React, { useState } from "react";
import Image from "next/image";

interface BlurredBackgroundProps {
  src: string;
  blurDataURL: string;
  alt?: string;
  overlay?: string;
  className?: string;
  priority?: boolean;
  layoutMode?: "cover" | "contain" | "fixed" | "parallax";
  children?: React.ReactNode;
}

export default function BlurredBackground({
  src,
  blurDataURL,
  alt = "background image",
  overlay,
  className = "",
  priority = false,
  layoutMode = "cover",
  children,
}: BlurredBackgroundProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const layoutStyles = {
    cover: "object-cover object-center",
    contain: "object-contain object-center bg-white",
    fixed: "object-cover object-center fixed top-0 left-0 -z-10",
    parallax: "object-cover object-center will-change-transform scale-105",
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!imageLoaded && (
        <div
          className="hidden md:block absolute inset-0 bg-center bg-no-repeat bg-cover blur-2xl scale-105 bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-700"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          placeholder="empty"
          onLoad={() => setImageLoaded(true)}
          className={`${
            layoutStyles[layoutMode]
          } hidden md:block transition-opacity duration-700 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      {overlay && <div className={`absolute inset-0 hidden md:block ${overlay}`} />}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
