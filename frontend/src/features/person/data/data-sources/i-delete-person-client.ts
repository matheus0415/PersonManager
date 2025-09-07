import type { HttpResponse } from "@/config/api-types";

export interface IDeletePersonClient {
  delete(id: number): Promise<HttpResponse<void>>;
}
