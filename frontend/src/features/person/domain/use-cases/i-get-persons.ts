import type { Person } from "../models/person";

export interface IGetPersons {
  getAll(): Promise<Person[]>;
}
