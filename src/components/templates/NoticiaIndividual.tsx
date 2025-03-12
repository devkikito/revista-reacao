"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/utils/categories";
import { Category } from "@/@types/types";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formateData";
import { Loader2 } from "lucide-react";
import { Noticia } from "@/@types/services";
import { MoreNewsSection } from "../sections/MoreNewsSection";
import { processParagraph } from "@/utils/processParagraph";
import { rectangle } from "@/utils/retangle";

type NoticiaIndividualProps = {
  noticia: Noticia;
  moreNews: any;
};

export const NoticiaIndividual = ({ noticia, moreNews }: NoticiaIndividualProps) => {
  const [categoria, setCategoria] = React.useState<Category | null>(null);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoriaData = categories[noticia.categoria];
        if (categoriaData) {
          setCategoria(categoriaData as any);
        }
      } catch (error) {
        console.error("Erro ao buscar os programas:", error);
      }
      setIsMounted(true);
    };

    fetchCategory();
  }, [noticia.categoria]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[80vh] flex justify-center">
        <Loader2 className={cn("h-12 w-12  m-auto animate-spin")} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <div
        className={`bg-cover bg-center bg-no-repeat ${categoria ? `bg-${categoria.name}` : ""} h-[24rem] `}
        style={{ backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(rectangle(categoria?.color))}")` }}
      >
        <div className="py-7 container w-full mx-auto lg:px-24 px-10">
          <span className="title-card text-white">{categoria?.name}</span>
        </div>
      </div>

      <div className="container bg-[rgb(var(--var-background-principal))] mx-auto lg:px-24 md:px-10 px-4 pb-9 mt-[-18rem] rounded-lg">
        <div className="md:pt-6 pt-4 ">
          <div className="mt-4 mb-6">
            <div className="flex flex-col text-start">
              <h2 className="h2-medium">{noticia.titulo}</h2>
              <p className="mt-2 paragraph-2">{noticia.resumo}</p>
            </div>
          </div>
          <div className="flex justify-center sm:justify-between flex-col sm:flex-row gap-2">
            <span>{noticia.data ? `${formatDate(noticia.data as any)}` : ""}</span>
            <Link
              aria-label="Compartilhar a notícia no facebook"
              href={`https://www.facebook.com/sharer.php?u=https://revistareacao.com.br/noticias/noticia?id=${noticia.id}`}
              target="_blank"
              className=" cursor-pointer flex sm:justify-between items-center gap-2"
            >
              <p>Compartilhar:</p>
              <Image
                src={"/noticias/facebook_compartilhar.svg"}
                width={39}
                height={39}
                alt="Ícone do Facebook para compartilhar a matéria"
                className="w-[39px] h-full"
              />
            </Link>
          </div>
          <Image
            src={noticia.imagem!}
            width={1920}
            height={1080}
            sizes="100vw"
            quality={100}
            alt={noticia.titulo}
            className="w-full object-cover h-full max-h-[36.25rem] my-9 rounded-lg"
          />

          {noticia.paragrafo?.map((paragrafo: string) => (
            <div key={paragrafo} className="flex flex-col gap-5 mt-4">
              <p className="paragraph-banners text-justify">{processParagraph(paragrafo)}</p>
            </div>
          ))}
          {noticia.link && (
            <div className="mt-4">
              <Link
                aria-label="Link referente à notícia"
                href={noticia.link}
                className="paragraph-banners text-[#8ab4f8] text-justify underline "
              >
                {noticia.link}
              </Link>
            </div>
          )}
        </div>
      </div>
      <MoreNewsSection moreNews={moreNews} />
    </React.Fragment>
  );
};
