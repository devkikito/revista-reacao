"use client";

import Image from "next/image";
import Link from "next/link";
import { TopicTitle } from "../ui/TopicTitle";
import { AdvertisingSectionProps } from "@/@types/types";
import { buttonVariants } from "../ui/button";

export const CarOfTheYearSection = ({
  alt,
  src,
  description,
  href,
  title,
  topTitle,
  buttonText,
}: AdvertisingSectionProps) => {
  return (
    <section className="section flex w-full h-full flex-col gap-8">
      <div className="w-full grid grid-cols-6 gap-[4.4375rem] max-md:gap-8  justify-between items-center max-md:flex max-md:flex-col ">
        <Link href={href || "#"} target="_blank" className="col-span-2">
          <Image
            src={src}
            alt={alt}
            className="rounded-3xl h-full w-auto "
            sizes="100vw"
            width={1200}
            height={800}
            quality={100}
          />
        </Link>

        <div className="flex flex-col  gap-8   w-full col-span-4">
          <div className="flex flex-col gap-4">
            {topTitle && <TopicTitle text={topTitle} />}
            <div className="flex flex-col text-start">
              <h2 className="h2-medium">{title}</h2>
              <p className="mt-2 paragraph-2 ">{description}</p>
            </div>
            {buttonText && href && (
              <Link href={href} className={buttonVariants()} target="_blank">
                {buttonText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
