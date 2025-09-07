import type {
  CreatePersonSuccessPayload,
  CreatePersonRequestPayload,
} from "../../../domain/models/person";
import {
  CREATE_PERSON_REQUEST,
  CREATE_PERSON_SUCCESS,
  CREATE_PERSON_ERROR,
} from "../types/create-person-types";


export const createPersonRequest = (payload: CreatePersonRequestPayload) => ({
  type: CREATE_PERSON_REQUEST,
  payload,
});

export const createPersonSuccess = (payload: CreatePersonSuccessPayload) => ({
  type: CREATE_PERSON_SUCCESS,
  payload,
});

export const createPersonError = (error: string) => ({
  type: CREATE_PERSON_ERROR,
  payload: error,
});
