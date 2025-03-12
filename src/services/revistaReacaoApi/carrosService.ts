import { AxiosResponse } from "axios";
import { Carro } from "@/@types/services";
import { apiRevistaReacao } from "./api";

export interface VoteInterface {
  votante: {
    nome: string;
    email: string;
    possuiDeficiencia: string;
  };
  votos: [
    {
      idCarro: number;
      tema: string;
    },
  ];
}

export async function findAllByCategory(categoria: string): Promise<AxiosResponse<Carro[]>> {
  return await apiRevistaReacao.get(`/carros?categoria=${categoria}`, {});
}

export async function postVote(voto: VoteInterface): Promise<void> {
  return await apiRevistaReacao.post(`/votacao`, voto);
}
