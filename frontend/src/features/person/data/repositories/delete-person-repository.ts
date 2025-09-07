import type { IDeletePersonClient } from "../data-sources/i-delete-person-client";

export class DeletePersonRepository {
  private dataSource: IDeletePersonClient;

  constructor(dataSource: IDeletePersonClient) {
    this.dataSource = dataSource;
  }

  async delete(id: number): Promise<void> {
    await this.dataSource.delete(id);
  }
}
