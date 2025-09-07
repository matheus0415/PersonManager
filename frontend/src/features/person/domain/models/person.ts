export interface Person {
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

export interface CreatePersonParams {
  name: string;
  gender?: string;
  email?: string;
  birthDate: string;
  placeOfBirth?: string;
  nationality?: string;
  cpf: string;
}

export type CreatePersonResponse = {
  person: Person;
};

export type CreatePersonRequestPayload = CreatePersonParams;

export type CreatePersonSuccessPayload = { message: string };

export interface CreatePersonState {
  loading: boolean;
  success: boolean;
  error: string | null;
}
