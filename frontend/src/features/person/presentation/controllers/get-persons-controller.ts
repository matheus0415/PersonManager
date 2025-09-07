import type { IGetPersons } from "../../domain/use-cases/i-get-persons";
import type { Person } from "../../domain/models/person";

export class GetPersonsController {
  private readonly repository: IGetPersons;
  constructor(repository: IGetPersons) {
    this.repository = repository;
  }

  async getAll(): Promise<Person[]> {
    return await this.repository.getAll();
  }
}
