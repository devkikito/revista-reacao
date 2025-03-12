"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { TopicTitle } from "../ui/TopicTitle";
import { findById } from "@/services/revistaReacaoApi/boletimService";
import { Boletim } from "@/@types/services";
import { buttonVariants } from "../ui/button";

export const VideoFrameSection = () => {
  const [video, setVideo] = React.useState<Boletim>();
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string>("");

  React.useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await findById("ed463d94-77e1-496b-8964-3481a7885074");
        const data = response.data;
        setVideo(data);
        const thumbnail = getYoutubeThumbnail(data.link);
        setThumbnailUrl(thumbnail);
      } catch (error) {
        console.error("Error fetching latest video:", error);
      }
    };
    fetchVideo();
  }, []);

  const getYoutubeThumbnail = (url: string) => {
    const videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      return `https://img.youtube.com/vi/${videoId.substring(0, ampersandPosition)}/0.jpg`;
    }
    return `https://img.youtube.com/vi/${videoId}/0.jpg`;
  };

  if (video) {
    return (
      <section className="section flex w-full h-full flex-col gap-8">
        <div className="w-full flex gap-[4.4375rem] max-md:gap-8 justify-between items-center max-md:flex-col ">
          <Link
            target="_blank"
            className="aspect-[16/9] flex items-center relative w-full h-auto rounded-lg overflow-hidden shadow-lg cursor-pointer"
            href={video.link}
          >
            {thumbnailUrl && (
              <Image
                src={thumbnailUrl}
                alt={`Video Thumbnail`}
                className="w-full h-auto "
                sizes="300"
                width={1200}
                height={800}
                quality={100}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white opacity-75 hover:opacity-100 transition-opacity"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.661 10.48l-6.5-3.75a.5.5 0 0 0-.828.38v7.5a.5.5 0 0 0 .828.38l6.5-3.75a.5.5 0 0 0 0-.76z"
                />
              </svg>
            </div>
          </Link>

          <div className="flex flex-col  gap-8   w-full ">
            <div className="flex flex-col gap-4">
              <TopicTitle text="Boletim diário" />
              <div className="flex flex-col text-start">
                <h2 className="h2-medium">{video.titulo}</h2>
                <p className="mt-2 paragraph-2">{video.descricao}</p>
                <Link href={video.link} target="_blank" className={`${buttonVariants()} mt-4`} title="Assistir boletim">
                  Assistir boletim
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
