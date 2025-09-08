import {
  UPDATE_PERSON_REQUEST,
  UPDATE_PERSON_SUCCESS,
  UPDATE_PERSON_ERROR,
  UPDATE_PERSON_RESET,
} from "../types/update-person-types";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../../../domain/models/person";

export const updatePersonRequest = (
  id: number,
  params: CreatePersonParams
) => ({
  type: UPDATE_PERSON_REQUEST as typeof UPDATE_PERSON_REQUEST,
  payload: { id, params },
});

export const updatePersonReset = () => ({
  type: UPDATE_PERSON_RESET as typeof UPDATE_PERSON_RESET,
});

export const updatePersonSuccess = (response: CreatePersonResponse) => ({
  type: UPDATE_PERSON_SUCCESS as typeof UPDATE_PERSON_SUCCESS,
  payload: response,
});

export const updatePersonError = (error: string) => ({
  type: UPDATE_PERSON_ERROR as typeof UPDATE_PERSON_ERROR,
  payload: error,
});
