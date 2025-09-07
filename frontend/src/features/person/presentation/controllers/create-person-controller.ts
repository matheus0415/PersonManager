import type { CreatePersonParams, CreatePersonResponse } from "../../domain/models/person";
import type { ICreatePerson } from "../../domain/use-cases/i-create-person";

export class CreatePersonController {
  private readonly repository: ICreatePerson;

  constructor(repository: ICreatePerson) {
    this.repository = repository;
  }

  async create(params?: CreatePersonParams): Promise<CreatePersonResponse> {
    return await this.repository.create(params);
  }
}
