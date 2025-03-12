"use client";

import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { NewsCard } from "../cards/NewsCard";
import { TopicTitle } from "../ui/TopicTitle";
import { Noticia } from "@/@types/services";
import { getAllDailyNewsAction } from "@/app/actions/newsActions";
import { getCategoryInfo } from "@/utils/categories";
import { formatDateMouth } from "@/utils/formateData";

export function DailyNewsSection() {
  const [dailyNews, setDailyNews] = React.useState<Noticia[] | null>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetch() {
      try {
        const res = await getAllDailyNewsAction();
        setDailyNews(res.content);
      } catch (error) {
        console.log(error);
      } finally {
        setIsMounted(true);
      }
    }
    fetch();
  }, []);

  if (!isMounted || !dailyNews || dailyNews.length == 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full flex flex-col gap-5 section"
    >
      <TopicTitle text="Notícias do dia" />

      <CarouselContent>
        {dailyNews.map((data) => (
          <CarouselItem key={data.id} className="lg:basis-[auto] select-none">
            <div className="p-1 flex items-start justify-center h-full">
              <NewsCard
                extraClassName="w-full max-w-[80vw] justify-between lg:h-full lg:max-w-[25rem]"
                imageUrl={data.imagem}
                title={data.titulo}
                paragraph={data.resumo}
                category={getCategoryInfo(data.categoria).name}
                date={formatDateMouth(data.data as unknown as string)}
                link={`/noticias/noticia?id=${data.id}`}
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
