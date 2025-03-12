import axios, { AxiosInstance } from "axios";
import { destroyCookie, parseCookies } from "nookies";

let cookies = parseCookies();
export let apiRevistaReacao: AxiosInstance;

apiRevistaReacao = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

apiRevistaReacao.interceptors.request.use(
  (config) => {
    cookies = parseCookies();
    const { "revosta-reacao.token": token } = cookies;

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiRevistaReacao.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error) => {
    if (error?.response) {
      if (error?.response?.status === 401) {
        if (error?.response?.data?.message === "Usuário inexistente ou senha inválida") {
          return Promise.reject(error);
        } else if (
          error?.response?.data?.message.includes("É necessário estar autenticado para utilizar este recurso") ||
          error?.response?.data?.message.includes("Token inválido ou expirado")
        ) {
          destroyCookie(undefined, "revosta-reacao.token");
          if (typeof window !== "undefined") {
            window.location.href = "/entrar";
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
