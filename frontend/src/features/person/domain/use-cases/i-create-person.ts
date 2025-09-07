import type { CreatePersonParams, CreatePersonResponse } from "../models/person";

export interface ICreatePerson {
  create(params?: CreatePersonParams): Promise<CreatePersonResponse>;
}
