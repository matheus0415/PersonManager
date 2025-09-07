import axios from "axios";
import type { AxiosInstance } from "axios";
import { Env } from "./env";
import { HttpError } from "./errors";

let instance: AxiosInstance | null = null;

export function http(): AxiosInstance {
  if (instance) return instance;

  instance = axios.create({
    baseURL: Env.API_BASE_URL,
    timeout: Env.API_TIMEOUT_MS,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use((config) => {
    return config;
  });

  instance.interceptors.response.use(
    (res) => res,
    (e) => {
      const status = e?.response?.status ?? 0;
      const data = e?.response?.data;
      const message =
        e?.response?.data?.message ?? e?.message ?? "Network/Unknown error";
      throw new HttpError(message, status, data);
    }
  );

  return instance;
}
