"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsCard } from "../cards/NewsCard";
import { TopicTitle } from "../ui/TopicTitle";
import { Noticia } from "@/@types/services";
import { formatDate } from "@/utils/formateData";

type MoreNewsSectionProps = {
  moreNews: any;
};

export function MoreNewsSection({ moreNews }: Readonly<MoreNewsSectionProps>) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full flex flex-col gap-5 section"
    >
      <TopicTitle text="Veja também" />
      <CarouselContent>
        {moreNews.content.map((news: Noticia) => (
          <CarouselItem key={news.id} className="lg:basis-[auto] select-none">
            <div className="p-1 flex items-center justify-center">
              <NewsCard
                extraClassName="w-full max-w-[80vw] lg:max-w-[25rem]"
                imageUrl={news.imagem}
                title={news.titulo}
                paragraph={news.resumo}
                category={news.categoria}
                date={formatDate(news.data! as unknown as string)}
                link={`/noticias/noticia?id=${news.id}`}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
