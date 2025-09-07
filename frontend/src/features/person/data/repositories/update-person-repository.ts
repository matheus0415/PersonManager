import type { IUpdatePersonClient } from "../data-sources/i-update-person-client";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../../domain/models/person";
import type { HttpResponse } from "@/config/api-types";

export class UpdatePersonRepository {
  private dataSource: IUpdatePersonClient;
  constructor(dataSource: IUpdatePersonClient) {
    this.dataSource = dataSource;
  }

  async update(
    id: number,
    params: CreatePersonParams,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<CreatePersonResponse>> {
    return this.dataSource.update(id, params, options);
  }
}
