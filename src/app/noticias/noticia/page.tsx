"use server";

import React from "react";
import { NoticiaIndividual } from "@/components/templates/NoticiaIndividual";
import { findAllFilteredNoticia, findNoticiaById } from "@/services/revistaReacaoApi/noticiaService";
import { Metadata } from "next";
import { FilterNoticiaParams } from "@/@types/services";
import defaultMetatada from "@/metadata/defaultMetadata";

export async function generateMetadata({
  searchParams,
}: Readonly<{ searchParams: { id: string } }>): Promise<Metadata> {
  try {
    const res = await findNoticiaById(searchParams.id);
    const noticias = res.data;
    return {
      title: {
        template: `${noticias.titulo} | Notícias Revista Reação`,
        default: "Notícias Revista Reação",
      },
      description: noticias.resumo,
      openGraph: {
        title: {
          template: `${noticias.titulo} | Notícias Revista Reação`,
          default: "Notícias Revista Reação",
        },
        description: noticias.resumo,
        url: `https://revistareacao.com.br/noticias/noticia?id=${noticias.id}`,
        type: "article",
        images: [
          {
            url: noticias.imagem || "",
            alt: noticias.textoAlternativoImagem || "Logotipo da Biomob",
            width: 1200,
            height: 630,
          },
        ],
      },
      keywords: "Promovendo inclusão e diversidade.",
    };
  } catch (error) {
    return defaultMetatada();
  }
}

export default async function Noticia({ searchParams }: Readonly<{ searchParams: { id: string } }>) {
  if (searchParams.id) {
    try {
      const res = await findNoticiaById(searchParams.id);
      const noticias = res.data;
      const moreNews = await findAllFilteredNoticia({
        categoria: noticias.categoria,
        page: 0,
        size: 5,
      });
      return <NoticiaIndividual noticia={noticias} moreNews={moreNews} />;
    } catch (error) {
      console.log("Failed to load news data: ", error);
      return <span>Erro ao carregar as informações da notícia selecionada</span>;
    }
  }
}
