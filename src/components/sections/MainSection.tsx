"use client";

import React from "react";
import { Noticia } from "@/@types/services";
import { NewsCard, NewsCardMain } from "@/components/cards/NewsCard";
import { TopicTitle } from "@/components/ui/TopicTitle";
import { getCategoryInfo } from "@/utils/categories";
import { formatDateMouth } from "@/utils/formateData";
import { Skeleton } from "../ui/skeleton";
import { find3MainBannerNoticia, findMainBannerNoticia } from "@/services/revistaReacaoApi/noticiaService";

export const MainSection = () => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);
  const [threeNewsData, setThreeNewsData] = React.useState<Noticia[] | null>(null);
  const [unicNewsData, setUnicNewsData] = React.useState<Noticia | null>(null);

  React.useEffect(() => {
    async function fetch() {
      try {
        const threeNewsRes = await find3MainBannerNoticia();
        const unicNewsRes = await findMainBannerNoticia();
        setThreeNewsData(threeNewsRes.data?.content || []);
        setUnicNewsData(unicNewsRes.data?.content[0] || null);
      } catch (error) {
        console.log(error);
      } finally {
        setIsMounted(true);
      }
    }
    fetch();
  }, []);

  if (!isMounted || !unicNewsData || !threeNewsData) {
    return <Skeleton className="w-screen h-screen" />;
  }

  return (
    <section className="section grid md:grid-cols-5 md:gap-3 gap-20 items-start ">
      <div className="w-full col-span-3">
        <NewsCardMain {...unicNewsData} />
      </div>
      <div className="flex flex-col gap-5 p-[.625rem] col-span-3 md:col-span-2  md:[&>*:last-child]:hidden 2xl:[&>*:last-child]:flex ">
        <TopicTitle text="Notícias populares" />
        {threeNewsData?.map((data) => (
          <NewsCard
            key={data.id}
            title={data.titulo}
            paragraph={data.resumo}
            category={getCategoryInfo(data.categoria).name}
            date={formatDateMouth(data.data as unknown as string)}
            link={`/noticias/noticia?id=${data.id}`}
          />
        ))}
      </div>
    </section>
  );
};
