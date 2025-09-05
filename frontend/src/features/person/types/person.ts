export interface PersonDto {
  id: number;
  name: string;
  gender: string;
  email: string;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePersonDto {
  name: string;
  gender: string;
  email: string;
  birthDate: string;
  placeOfBirth: string;
  nationality: string;
  cpf: string;
}
