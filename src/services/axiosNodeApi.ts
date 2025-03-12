"use server";

import axios, { AxiosInstance } from "axios";

const URL_API: string = process.env.BASE_URL || "";

const api: AxiosInstance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: URL_API,
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export default api;
