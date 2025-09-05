import { api } from "../../../lib/api";
import type {
  PersonDto,
  CreatePersonDto,
  
} from "../types/person";

export async function getPersons(): Promise<PersonDto[]> {
  const { data } = await api.get<PersonDto[]>("/person");
  return data;
}

export async function getPerson(id: number): Promise<PersonDto> {
  const { data } = await api.get<PersonDto>(`/person/${id}`);
  return data;
}

export async function createPerson(
  person: CreatePersonDto
): Promise<PersonDto> {
  const { data } = await api.post<PersonDto>("/person", person);
  return data;
}

export async function updatePerson(
  id: number,
): Promise<void> {
  await api.put(`/person/${id}`);
}

export async function deletePerson(id: number): Promise<void> {
  await api.delete(`/person/${id}`);
}
