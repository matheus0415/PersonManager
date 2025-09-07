import type { Person } from "../../domain/models/person";

export interface IGetPersonsClient {
  getAll(): Promise<Person[]>;
}
