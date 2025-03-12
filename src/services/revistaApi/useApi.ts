import axios, { AxiosInstance } from "axios";

const URL_API: string = process.env.NEXT_PUBLIC_BASE_URL || "";

const api: AxiosInstance = axios.create({
  baseURL: URL_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // O servidor respondeu com um status de erro (por exemplo, 404, 500)
      console.error("Erro de resposta:", error.response.status);
      console.error("Dados da resposta de erro:", error.response.data);
      console.error("Cabeçalhos da resposta de erro:", error.response.headers);
    } else if (error.request) {
      // A solicitação foi feita, mas não houve resposta do servidor
      console.error("Erro na solicitação, não houve resposta do servidor:", error.request);
    } else {
      // Um erro ocorreu durante a configuração da solicitação ou em qualquer outro lugar
      console.error("Erro durante a configuração da solicitação:", error.message);
    }
    console.error("Erro durante a solicitação:", error.config);

    // Retornar uma Promessa rejeitada com o erro para que ele seja tratado no chamador
    return Promise.reject(error);
  }
);

export default api;
