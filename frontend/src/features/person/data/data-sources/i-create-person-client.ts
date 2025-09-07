import type { HttpResponse } from "../../../../config/api-types";
import type { CreatePersonParams, CreatePersonResponse } from "../../domain/models/person";

export interface ICreatePersonClient {
  create(
	_params?: CreatePersonParams
  ): Promise<HttpResponse<CreatePersonResponse>>;
}
