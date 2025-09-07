import type { CreatePersonParams } from "../models/person";
import type { HttpResponse } from "@/config/api-types";
import type { CreatePersonResponse } from "../models/person";

export interface IUpdatePersonUseCase {
  update(
    id: number,
    params: CreatePersonParams
  ): Promise<HttpResponse<CreatePersonResponse>>;
}
