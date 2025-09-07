import { HttpStatusCode } from "axios";
import type { ICreatePersonClient } from "../data-sources/i-create-person-client";
import type { ICreatePerson } from "../../domain/use-cases/i-create-person";
import { Exception } from "../../../../errors/exception";
import type { CreatePersonParams, CreatePersonResponse } from "../../domain/models/person";

export class CreatePersonRepository implements ICreatePerson {
  private readonly dataSource: ICreatePersonClient;

  constructor(dataSource: ICreatePersonClient) {
    this.dataSource = dataSource;
  }

  async create(params?: CreatePersonParams): Promise<CreatePersonResponse> {
    const result = await this.dataSource.create(params);

    if (result.status !== HttpStatusCode.Ok) {
      throw new Exception(result.status, result.message!);
    }

    return result.data;
  }
}
