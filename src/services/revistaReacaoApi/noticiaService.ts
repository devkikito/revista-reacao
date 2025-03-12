import { ApiResponse, FilterNoticiaParams, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import api from "../axiosNodeApi";

export async function findAllNoticia(): Promise<ApiResponse<Noticia>> {
  return await api.get("/noticias?page=0&size=10&sort=data,desc");
}

export async function findAllFilteredNoticia(params: FilterNoticiaParams = {}): Promise<ApiResponse<Noticia>> {
  const queryString = new URLSearchParams(params as any).toString();
  return await api.get(`/noticias/filtradas?${queryString}`);
}

export async function findAllPaginatedNoticia(
  params: FilterPaginatedNoticiaParams = {}
): Promise<ApiResponse<Noticia>> {
  const queryString = new URLSearchParams(params as any).toString();
  return await api.get(`/noticias/filtradas?${queryString}`);
}

export async function find3MainBannerNoticia(): Promise<ApiResponse<Noticia>> {
  return await api.get("/noticias/filtradas?sort=data,desc&page=2&size=3", {});
}

export async function findMainBannerNoticia(): Promise<ApiResponse<Noticia>> {
  return await api.get("/noticias/filtradas?sort=data,desc&page=9&size=1", {});
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
  return await api.get(`/noticias/filtradas?${queryString}`);
}

export async function findMainBannerNoticiasPage(): Promise<ApiResponse<Noticia>> {
  return await api.get("/noticias/filtradas?sort=data,desc&page=13&size=1", {});
}

export async function findAllWeeklyNoticia(): Promise<ApiResponse<Noticia>> {
  return await api.get(`/noticias/filtradas?ultimaSemana=true&size=100`);
}

export async function findNoticiaById(id: string): Promise<Noticia> {
  const timestamp = new Date().getTime();
  return await api.get(`/noticias/${id}?_=${timestamp}`);
}

export async function findAllArchivedNoticia(): Promise<Noticia[]> {
  return await api.get("/noticias/arquivadas/admin");
}
