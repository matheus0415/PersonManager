import type { DeletePersonService } from "@/features/person/service/delete-person-service";

export class DeletePersonController {
  private readonly service: DeletePersonService;

  constructor(service: DeletePersonService) {
    this.service = service;
  }

  async delete(id: number): Promise<void> {
    await this.service.delete(id);
  }
}
