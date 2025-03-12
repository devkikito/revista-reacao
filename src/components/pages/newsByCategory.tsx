"use client";
import React from "react";
import { CategoriesType, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import { formatDateMouth } from "@/utils/formateData";
import { getCategoryInfo } from "@/utils/categories";
import { getPaginatedNewsAction } from "@/app/actions/newsActions";
import { NewsCard } from "@/components/cards/NewsCard";
import { TopicTitle } from "@/components/ui/TopicTitle";
import { usePagination } from "@/context/PaginationContext";
import Pagination from "../ui/paginationControler";

interface NewsByCategoryPageProps {
  category: string;
}

export default function NewsByCategoryPage({ category }: Readonly<NewsByCategoryPageProps>) {
  const [newsByCategory, setNewsByCategory] = React.useState<Noticia[] | null>(null);
  const { setTotalItems, currentPage, itemsPerPage } = usePagination();

  React.useEffect(() => {
    async function fetch() {
      try {
        const pagination: FilterPaginatedNoticiaParams = {
          desc: true,
          page: currentPage,
          size: itemsPerPage,
          categoria: category as unknown as CategoriesType,
        };
        const res = await getPaginatedNewsAction(pagination);
        setNewsByCategory(res.content);
        setTotalItems(res.totalElements);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, currentPage, itemsPerPage]);

  return (
    <section className="section flex flex-col gap-5 mt-20">
      <TopicTitle text={getCategoryInfo(category).name} />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full auto-rows-fr">
        {newsByCategory?.map((data) => (
          <div key={data.id} className="p-1 w-full break-inside-avoid">
            <NewsCard
              extraClassName="w-full h-full flex flex-col justify-between"
              imageUrl={data.imagem}
              title={data.titulo}
              paragraph={data.resumo}
              category={getCategoryInfo(data.categoria).name}
              date={formatDateMouth(data.data as unknown as string)}
              link={`/noticias/noticia?id=${data.id}`}
            />
          </div>
        ))}
      </div>
      <Pagination />
    </section>
  );
}
