import { Exception } from "@/errors/exception";
import type { IGetPersonsClient } from "../data-sources/i-get-persons-client";
import type { Person } from "../../domain/models/person";
import type { GetPersonsService } from "../../service/get-persons-service";

export class GetPersonsRepository implements IGetPersonsClient {
  private readonly dataSource: GetPersonsService;
  constructor(dataSource: GetPersonsService) {
    this.dataSource = dataSource;
  }

  async getAll(): Promise<Person[]> {
    const result = await this.dataSource.getAll();
    if (!result.success) {
      throw new Exception(result.status, result.message!);
    }
    return result.data;
  }
}
