"use client";

import Image from "next/image";
import { TopicTitle } from "../ui/TopicTitle";
import Link from "next/link";
import { AdvertisingSectionProps } from "@/@types/types";
import React from "react";
import { Skeleton } from "../ui/skeleton";

export const AdvertisingSection = ({ href, src, alt, description, title }: AdvertisingSectionProps) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Skeleton className="w-full h-auto aspect-[1300/800]" />;
  }

  return (
    <section className="section flex w-full h-full flex-col gap-8">
      <div className="w-full flex gap-[4.4375rem] max-md:gap-8  justify-between items-center max-md:flex-col ">
        <Link href={href || "#"} target="_blank" className="w-full h-auto max-h-[45rem] ">
          <Image
            src={src}
            alt={alt}
            className="rounded-3xl"
            layout="responsive"
            width={1200}
            height={800}
            quality={100}
          />
        </Link>

        <div className="flex flex-col  gap-8   w-full ">
          <div className="flex flex-col gap-4">
            <TopicTitle text="Publicidade" />
            <div className="flex flex-col text-start">
              <h2 className="h2-medium">{title}</h2>
              <p className="mt-2 paragraph-2">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AdvertisinghorizontalSection = ({ alt, src, href, quality }: AdvertisingSectionProps) => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Skeleton className="w-full h-auto aspect-[1300/300]" />;
  }

  return (
    <section className="section flex flex-col gap-4">
      <TopicTitle text="Publicidade" />

      <Link target="_blank" href={href || "#"} className="w-full h-auto ">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          layout="responsive"
          width={1200}
          height={230}
          quality={quality || 100}
        />
      </Link>
    </section>
  );
};
