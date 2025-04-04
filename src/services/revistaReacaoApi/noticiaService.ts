import { ApiResponse, FilterNoticiaParams, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import { AxiosResponse } from "axios";
import api from "../revistaApi/useApi";

export async function findAllNoticia(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  return api.get("/noticias?page=0&size=10&sort=data,desc");
}

export async function findAllFilteredNoticia(
  params: FilterNoticiaParams = {}
): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  const queryString = new URLSearchParams(params as any).toString();
  return api.get(`/noticias/filtradas/v2?${queryString}`);
}

export async function findAllPaginatedNoticia(
  params: FilterPaginatedNoticiaParams = {}
): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  const queryString = new URLSearchParams(params as any).toString();
  return api.get(`/noticias/filtradas/v2?${queryString}`);
}

export async function find3MainBannerNoticia(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  return api.get("/noticias/filtradas/v2?sort=data,desc&page=2&size=3", {});
}

export async function findMainBannerNoticia(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  return api.get("/noticias/filtradas/v2?sort=data,desc&page=9&size=1", {});
}

export async function findAllDailyNoticia(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
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
  return api.get(`/noticias/filtradas/v2?${queryString}`);
}

export async function findMainBannerNoticiasPage(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  return api.get(`/noticias/filtradas/v2?sort=data,desc&page=13&size=1`);
}

export async function findAllWeeklyNoticia(): Promise<AxiosResponse<ApiResponse<Noticia>>> {
  return api.get(`/noticias/filtradas/v2?ultimaSemana=true&size=100`);
}

export async function findNoticiaById(id: string): Promise<AxiosResponse<Noticia>> {
  const timestamp = new Date().getTime();
  return api.get(`/noticias/${id}?_=${timestamp}`);
}

export async function findAllArchivedNoticia(): Promise<AxiosResponse<Noticia[]>> {
  return api.get("/noticias/arquivadas/admin");
}
