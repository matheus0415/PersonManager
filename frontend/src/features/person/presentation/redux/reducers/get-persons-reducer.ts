import type { Person } from "@/features/person/domain/models/person";
import {
  GET_PERSONS_REQUEST,
  GET_PERSONS_SUCCESS,
  GET_PERSONS_ERROR,
} from "../types/get-persons-types";

export interface GetPersonsRequestAction {
  type: typeof GET_PERSONS_REQUEST;
}

export interface GetPersonsSuccessAction {
  type: typeof GET_PERSONS_SUCCESS;
  payload: Person[];
}

export interface GetPersonsErrorAction {
  type: typeof GET_PERSONS_ERROR;
  payload: string;
}

export type GetPersonsActionTypes =
  | GetPersonsRequestAction
  | GetPersonsSuccessAction
  | GetPersonsErrorAction;

export type GetPersonsState = {
  loading: boolean;
  persons: Person[];
  error: string | null;
};

const initialState: GetPersonsState = {
  loading: false,
  persons: [],
  error: null,
};

export function getPersonsReducer(
  state: GetPersonsState = initialState,
  action: import("redux").AnyAction
): GetPersonsState {
  switch (action.type) {
    case GET_PERSONS_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_PERSONS_SUCCESS:
      return { ...state, loading: false, persons: action.payload };
    case GET_PERSONS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
