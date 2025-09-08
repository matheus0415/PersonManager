import {
  UPDATE_PERSON_REQUEST,
  UPDATE_PERSON_SUCCESS,
  UPDATE_PERSON_ERROR,
  UPDATE_PERSON_RESET,
} from "../types/update-person-types";
import type { RequestStatusState } from "@/app/rootState";
import type {
  CreatePersonParams,
  CreatePersonResponse,
} from "../../../domain/models/person";

export type UpdatePersonRequestAction = {
  type: typeof UPDATE_PERSON_REQUEST;
  payload: { id: number; params: CreatePersonParams };
};

export type UpdatePersonSuccessAction = {
  type: typeof UPDATE_PERSON_SUCCESS;
  payload: CreatePersonResponse;
};

export type UpdatePersonErrorAction = {
  type: typeof UPDATE_PERSON_ERROR;
  payload: string;
};

export type UpdatePersonResetAction = {
  type: typeof UPDATE_PERSON_RESET;
};

export type UpdatePersonActionTypes =
  | UpdatePersonRequestAction
  | UpdatePersonSuccessAction
  | UpdatePersonErrorAction
  | UpdatePersonResetAction;

export interface UpdatePersonState extends RequestStatusState {
  response?: CreatePersonResponse;
}

const initialState: UpdatePersonState = {
  loading: false,
  error: null,
  response: undefined,
};

export const updatePersonReducer = (
  state: UpdatePersonState = initialState,
  action: UpdatePersonActionTypes
): UpdatePersonState => {
  switch (action.type) {
    case UPDATE_PERSON_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        error: null,
      };
    case UPDATE_PERSON_ERROR:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_PERSON_RESET:
      return initialState;
    default:
      return state;
  }
};
