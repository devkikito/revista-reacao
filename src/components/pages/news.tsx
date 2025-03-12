"use client";
import React from "react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CategoriesType, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import { formatDateMouth } from "@/utils/formateData";
import { getCategoryInfo } from "@/utils/categories";
import { getPaginatedNewsAction } from "@/app/actions/newsActions";
import { MainNewsSection } from "@/components/sections/MainNewsSection";
import { NewsCard } from "@/components/cards/NewsCard";
import { TopicTitle } from "@/components/ui/TopicTitle";

export default function NewsPage() {
  const [newsByCategory, setNewsByCategory] = React.useState<Record<string, Noticia[]>>({});

  React.useEffect(() => {
    async function fetchNewsByCategory() {
      const allNews = await Promise.all(
        categories.map(async (category) => {
          try {
            const pagination: FilterPaginatedNoticiaParams = {
              desc: true,
              page: 0,
              size: 6,
              categoria: category.id as unknown as CategoriesType,
            };
            const res = await getPaginatedNewsAction(pagination);
            return { category: category.id, news: res.content };
          } catch (error) {
            console.log(error);
            return { category: category.id, news: [] };
          }
        })
      );

      const newsByCategoryObj = allNews.reduce(
        (acc, curr) => {
          acc[curr.category] = curr.news;
          return acc;
        },
        {} as Record<string, Noticia[]>
      );
      setNewsByCategory(newsByCategoryObj);
    }
    fetchNewsByCategory();
  }, []);

  return (
    <section className="flex flex-col gap-20">
      <MainNewsSection />

      {categories.map((category) => (
        <Carousel key={category.id} opts={{ align: "start" }} className="w-full flex flex-col gap-5 section">
          <div className="flex flex-col md:flex-row justify-between md:gap-4 items-start md:items-center">
            <TopicTitle text={category.name} />
            <Link href={`/noticias/${category.id}`} className="cta mb-4">
              Ver todas as notícias
            </Link>
          </div>
          <CarouselContent>
            {newsByCategory[category.id]?.map((data) => (
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
      ))}
    </section>
  );
}

const categories = [
  {
    id: "ACESSIBILIDADE",
    name: "ACESSIBILIDADE",
  },
  {
    id: "CULTURA",
    name: "CULTURA",
  },
  {
    id: "TECNOLOGIA",
    name: "TECNOLOGIA",
  },
  {
    id: "EVENTOS",
    name: "EVENTOS",
  },
  {
    id: "ESPORTES",
    name: "ESPORTES",
  },
  {
    id: "ENTREVISTA",
    name: "ENTREVISTA",
  },
  {
    id: "JUSTICAEPOLITICA",
    name: "JUSTICA E POLÍTICA",
  },
  {
    id: "SAUDE",
    name: "SAÚDE",
  },
  {
    id: "TESTDRIVE",
    name: "TESTDRIVE",
  },
  {
    id: "INTERNACIONAL",
    name: "INTERNACIONAL",
  },
  {
    id: "TRABALHO",
    name: "TRABALHO",
  },
  {
    id: "ESPECIAL",
    name: "ESPECIAL",
  },
];
