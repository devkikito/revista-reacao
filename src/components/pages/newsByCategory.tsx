"use client";
import React from "react";
import { CategoriesType, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import { formatDateMouth } from "@/utils/formateData";
import { getCategoryInfo } from "@/utils/categories";
import { NewsCard } from "@/components/cards/NewsCard";
import { TopicTitle } from "@/components/ui/TopicTitle";
import { usePagination } from "@/context/PaginationContext";
import Pagination from "../ui/paginationControler";
import { findAllPaginatedNoticia } from "@/services/revistaReacaoApi/noticiaService";

interface NewsByCategoryPageProps {
  category: string;
}

export default function NewsByCategoryPage({ category }: Readonly<NewsByCategoryPageProps>) {
  const [newsByCategory, setNewsByCategory] = React.useState<Noticia[] | null>(null);
  const { setTotalItems, currentPage, itemsPerPage, searchText, setSearchText } = usePagination();

  React.useEffect(() => {
    console.log("minha searchText", searchText);
    async function fetch() {
      try {
        const pagination: FilterPaginatedNoticiaParams = {
          desc: true,
          page: currentPage,
          size: itemsPerPage,
          categoria: category as unknown as CategoriesType,
          palavraChave: searchText,
        };
        const res = await findAllPaginatedNoticia(pagination);
        setNewsByCategory(res.data?.content || []);
        setTotalItems(res.data?.totalElements || 0);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, [category, currentPage, itemsPerPage, searchText]);

  return (
    <section className="section flex flex-col gap-5 mt-20">
      <TopicTitle text={getCategoryInfo(category).name} />

      <div className="relative w-full max-w-md mb-6">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar notícias..."
          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        />
      </div>

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
