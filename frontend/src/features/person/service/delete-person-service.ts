import type { HttpResponse } from "@/config/api-types";
import { http } from "@/config/http";
import type { IDeletePersonClient } from "../data/data-sources/i-delete-person-client";
import { HttpError } from "@/config/errors";

export class DeletePersonService implements IDeletePersonClient {
  private readonly basePath: string;
  constructor(basePath = "api/Person") {
    this.basePath = basePath;
  }

  async delete(
    id: number,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<void>> {
    try {
      const client = http();
      const response = await client.delete(`${this.basePath}/${id}`, {
        signal: options?.signal,
      });
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError("Erro ao deletar pessoa", 500);
    }
  }
}
