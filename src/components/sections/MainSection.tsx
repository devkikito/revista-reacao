"use client";
import { useEffect, useState } from "react";
import { Noticia } from "@/@types/services";
import { NewsCard, NewsCardMain } from "@/components/cards/NewsCard";
import { TopicTitle } from "@/components/ui/TopicTitle";
import { getCategoryInfo } from "@/utils/categories";
import { formatDateMouth } from "@/utils/formateData";
import { Skeleton } from "../ui/skeleton";
import { getMainBannerNewsAction, getThreeMainBannerNewsAction } from "@/app/actions/newsActions";

export const MainSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [threeNewsData, setThreeNewsData] = useState<Noticia[] | null>(null);
  const [unicNewsData, setUnicNewsData] = useState<Noticia | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const resthreeNews = await getThreeMainBannerNewsAction();
        const resunicNews: any = await getMainBannerNewsAction();
        setThreeNewsData(resthreeNews as any);
        setUnicNewsData(resunicNews[0] as any);
      } catch (error) {
        console.log("Erro ao carregar notícias:", error);
      } finally {
        setIsMounted(true);
      }
    }
    fetchData();
  }, []);

  if (!isMounted || !unicNewsData || !threeNewsData) {
    return <Skeleton className="w-screen h-screen" />;
  }

  return (
    <section className="section grid md:grid-cols-5 md:gap-3 gap-20 items-start">
      <div className="w-full col-span-3">
        <NewsCardMain {...unicNewsData} />
      </div>
      <div className="flex flex-col gap-5 p-[.625rem] col-span-3 md:col-span-2 md:[&>*:last-child]:hidden 2xl:[&>*:last-child]:flex">
        <TopicTitle text="Notícias populares" />
        {(threeNewsData as any).map((data: any) => (
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
