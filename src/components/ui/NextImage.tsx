"use client";

import { NextImageType } from "@/@types/types";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";

export const NextImage: React.FC<NextImageType> = ({
  altImage,
  imageUrl,
  imageDarkUrl,
  className,
  extraClassName,
  fill,
  draggable,
  sizes,
  width,
  height,
}) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const { theme } = useTheme();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <span></span>;
  }

  return (
    <div
      unselectable="on"
      onDragStart={(e) => e.preventDefault()}
      className="relative w-full h-full overflow-hidden"
      title={altImage}
    >
      <Image
        src={imageDarkUrl && theme == "dark" ? imageDarkUrl : imageUrl}
        alt={altImage}
        aria-label={altImage}
        className={`${className || "w-full h-full object-cover select-none"} ${extraClassName}`}
        fill={fill || false}
        draggable={draggable || false}
        width={fill ? 0 : width || 500}
        height={fill ? 0 : height || 600}
        sizes={sizes}
        quality={100}
      />
    </div>
  );
};
