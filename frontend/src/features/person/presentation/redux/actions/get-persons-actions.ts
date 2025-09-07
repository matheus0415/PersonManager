import type { Person } from "@/features/person/domain/models/person";
import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_ERROR,
} from "../types/get-persons-types";

export const getPersonsRequest = () => ({
  type: GET_PERSONS_REQUEST,
});

export const getPersonsSuccess = (payload: Person[]) => ({
  type: GET_PERSONS_SUCCESS,
  payload,
});

export const getPersonsError = (error: string) => ({
  type: GET_PERSONS_ERROR,
  payload: error,
});
