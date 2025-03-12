"use server";

import { ApiResponse, FilterPaginatedNoticiaParams, Noticia } from "@/@types/services";
import {
  find3MainBannerNoticia,
  findAllDailyNoticia,
  findAllNoticia,
  findAllPaginatedNoticia,
  findAllWeeklyNoticia,
  findMainBannerNoticia,
  findMainBannerNoticiasPage,
  findNoticiaById,
} from "@/services/revistaReacaoApi/noticiaService";
import { UUID } from "crypto";

export async function getAllNewsAction(): Promise<ApiResponse<Noticia>> {
  return await findAllNoticia();
}

export async function getMainBannerNewsAction(): Promise<ApiResponse<Noticia>> {
  const res: any = await findMainBannerNoticia();
  const data = res.data.content;
  return await data;
}
export async function getThreeMainBannerNewsAction(): Promise<ApiResponse<Noticia>> {
  const res: any = await find3MainBannerNoticia();
  const data = res.data.content;
  return await data;
}

export async function getMainBannerNoticiasAction(): Promise<ApiResponse<Noticia>> {
  return await findMainBannerNoticiasPage();
}

export async function getPaginatedNewsAction(params: FilterPaginatedNoticiaParams): Promise<ApiResponse<Noticia>> {
  return await findAllPaginatedNoticia(params);
}

export async function getNewsByIdAction(id: UUID): Promise<Noticia> {
  return await findNoticiaById(id);
}

export async function getAllDailyNewsAction(): Promise<ApiResponse<Noticia>> {
  const res: any = await findAllDailyNoticia();
  const data = res.data;
  return await data;
}

export async function getAllWeeklyNewsAction(): Promise<ApiResponse<Noticia>> {
  return await findAllWeeklyNoticia();
}
