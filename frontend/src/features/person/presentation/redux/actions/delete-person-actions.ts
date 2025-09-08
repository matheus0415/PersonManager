import {
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_ERROR,
  DELETE_PERSON_RESET,
} from "../types/delete-person-types";

export const deletePersonRequest = (id: number) => ({
  type: DELETE_PERSON_REQUEST,
  payload: id,
});

export const deletePersonReset = () => ({
  type: DELETE_PERSON_RESET,
});

export const deletePersonSuccess = () => ({
  type: DELETE_PERSON_SUCCESS,
});

export const deletePersonError = (error: string) => ({
  type: DELETE_PERSON_ERROR,
  payload: error,
});
