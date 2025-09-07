import type { HttpResponse } from "@/config/api-types";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../../domain/models/person";

export interface IUpdatePersonClient {
  update(
    id: number,
    params: CreatePersonParams,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<CreatePersonResponse>>;
}
