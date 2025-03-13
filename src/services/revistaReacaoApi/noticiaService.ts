import { ApiResponse, FilterNoticiaParams, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import fetchWrapper from "./fetchWrapper";

export async function findAllNoticia(): Promise<ApiResponse<Noticia>> {
  return fetchWrapper("/noticias?page=0&size=10&sort=data,desc", { cache: "no-store" });
}

export async function findAllFilteredNoticia(params: FilterNoticiaParams = {}): Promise<ApiResponse<Noticia>> {
  const queryString = new URLSearchParams(params as any).toString();
  return fetchWrapper(`/noticias/filtradas/v2?${queryString}`, { cache: "no-store" });
}

export async function findAllPaginatedNoticia(
  params: FilterPaginatedNoticiaParams = {}
): Promise<ApiResponse<Noticia>> {
  const queryString = new URLSearchParams(params as any).toString();
  return fetchWrapper(`/noticias/filtradas/v2?${queryString}`);
}

export async function find3MainBannerNoticia(): Promise<ApiResponse<Noticia>> {
  return fetchWrapper("/noticias/filtradas/v2?sort=data,desc&page=2&size=3", {});
}

export async function findMainBannerNoticia(): Promise<ApiResponse<Noticia>> {
  return fetchWrapper("/noticias/filtradas/v2?sort=data,desc&page=9&size=1", {});
}

export async function findAllDailyNoticia(): Promise<ApiResponse<Noticia>> {
  const dataAtual = new Date();
  const timeZone = "America/Sao_Paulo";
  const dataAtualFormatada = dataAtual
    .toLocaleDateString("pt-BR", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .reverse()
    .join("-");

  const queryString = new URLSearchParams({ data: dataAtualFormatada }).toString();
  return fetchWrapper(`/noticias/filtradas/v2?${queryString}`);
}

export async function findMainBannerNoticiasPage(): Promise<ApiResponse<Noticia>> {
  return await fetchWrapper("/noticias/filtradas/v2?sort=data,desc&page=13&size=1", {});
}

export async function findAllWeeklyNoticia(): Promise<ApiResponse<Noticia>> {
  return fetchWrapper(`/noticias/filtradas/v2?ultimaSemana=true&size=100`, { cache: "no-store" });
}

export async function findNoticiaById(id: string): Promise<Noticia> {
  const timestamp = new Date().getTime();
  return fetchWrapper(`/noticias/${id}?_=${timestamp}`);
}

export async function findAllArchivedNoticia(): Promise<Noticia[]> {
  return fetchWrapper("/noticias/arquivadas/admin");
}
