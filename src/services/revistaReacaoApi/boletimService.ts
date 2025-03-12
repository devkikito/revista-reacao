import { AxiosResponse } from "axios";

import { Boletim } from "@/@types/services";
import api from "../revistaApi/useApi";

export async function findById(boletimId: string): Promise<AxiosResponse<Boletim>> {
  return await api.get(`/boletim/${boletimId}`, {});
}
