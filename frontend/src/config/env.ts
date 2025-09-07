export const Env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "https://localhost:5000",
  API_TIMEOUT_MS: Number(import.meta.env.VITE_API_TIMEOUT_MS ?? 10000),
};
