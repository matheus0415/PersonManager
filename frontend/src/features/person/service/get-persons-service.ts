import type { Person } from "@/features/person/domain/models/person";
import { http } from "@/config/http";
import type { HttpResponse } from "@/config/api-types";

export class GetPersonsService {
  private readonly basePath: string;
  constructor(basePath = "api/Person") {
    this.basePath = basePath;
  }

  async getAll(options?: {
    signal?: AbortSignal;
  }): Promise<HttpResponse<Person[]>> {
    try {
      const client = http();
      const response = await client.get<Person[]>(this.basePath, {
        signal: options?.signal,
      });
      return {
        status: response.status, 
        data: response.data, 
        success: true,
      };
    } catch {
      return {
        status: 500,
        data: [],
        success: false,
        message: "Failed to fetch persons",
      };
    }
  }
}
