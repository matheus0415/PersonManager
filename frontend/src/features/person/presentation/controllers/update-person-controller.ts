import type { UpdatePersonRepository } from "@/features/person/data/repositories/update-person-repository";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "@/features/person/domain/models/person";
import type { HttpResponse } from "@/config/api-types";

export class UpdatePersonController {
  private repository: UpdatePersonRepository;
  constructor(repository: UpdatePersonRepository) {
    this.repository = repository;
  }

  async update(
    id: number,
    params: CreatePersonParams,
    options?: { signal?: AbortSignal }
  ): Promise<HttpResponse<CreatePersonResponse>> {
    return this.repository.update(id, params, options);
  }
}
