import type { HttpResponse } from "../../../config/api-types";
import { http } from "@/config/http";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../domain/models/person";
import type { ICreatePersonClient } from "../data/data-sources/i-create-person-client";
import { HttpError } from "@/config/errors";

export class CreatePersonService implements ICreatePersonClient {
  private readonly basePath: string;
  constructor(basePath = "api/Person") {
    this.basePath = basePath;
  }

  async create(
    params: CreatePersonParams,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<CreatePersonResponse>> {
    try {
      const client = http();
      const response = await client.post<CreatePersonResponse>(
        this.basePath,
        params,
        { signal: options?.signal }
      );

      return {
        status: response.status,
        data: response.data,
        success: true,
      };
    } catch (e) {
      const err = e as HttpError;
      return {
        status: err.status ?? 500,
        data: {} as CreatePersonResponse,
        success: false,
        message: err.message ?? "Failed to create person",
      };
    }
  }
}
