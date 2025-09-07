import type { HttpResponse } from "@/config/api-types";
import { http } from "@/config/http";
import type { IUpdatePersonClient } from "../data/data-sources/i-update-person-client";
import { HttpError } from "@/config/errors";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../domain/models/person";

export class UpdatePersonService implements IUpdatePersonClient {
  private readonly basePath: string;
  constructor(basePath = "api/Person") {
    this.basePath = basePath;
  }

  async update(
    id: number,
    params: CreatePersonParams,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<CreatePersonResponse>> {
    try {
      const client = http();
      const response = await client.put(`${this.basePath}/${id}`, params, {
        signal: options?.signal,
      });
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError("Erro ao atualizar pessoa", 500);
    }
  }
}
