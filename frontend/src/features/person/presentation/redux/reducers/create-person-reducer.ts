import type { CreatePersonState } from "@/app/rootState";
import { initialState as baseInitialState } from "@/app/rootState";
import {
  CREATE_PERSON_REQUEST,
  CREATE_PERSON_SUCCESS,
  CREATE_PERSON_ERROR,
  CREATE_PERSON_RESET,
} from "../types/create-person-types";
import type {
  CreatePersonRequestPayload,
  CreatePersonResponse,
} from "../../../domain/models/person";

export interface CreatePersonRequestAction {
  type: typeof CREATE_PERSON_REQUEST;
  payload: CreatePersonRequestPayload;
}

export interface CreatePersonSuccessAction {
  type: typeof CREATE_PERSON_SUCCESS;
  payload: CreatePersonResponse;
}

export interface CreatePersonErrorAction {
  type: typeof CREATE_PERSON_ERROR;
  payload: string;
}

export interface CreatePersonResetAction {
  type: typeof CREATE_PERSON_RESET;
}

export type CreatePersonActionTypes =
  | CreatePersonRequestAction
  | CreatePersonSuccessAction
  | CreatePersonErrorAction
  | CreatePersonResetAction;

const initialState: CreatePersonState = {
  ...baseInitialState,
  person: null,
};

export const createPersonReducer = (
  state: CreatePersonState = initialState,
  action: CreatePersonActionTypes
): CreatePersonState => {
  switch (action.type) {
    case CREATE_PERSON_REQUEST:
      return { ...state, loading: true, error: null };
    case CREATE_PERSON_SUCCESS:
      return {
        ...state,
        loading: false,
        person: action.payload.person,
        error: null,
      };
    case CREATE_PERSON_ERROR:
      return {
        ...state,
        loading: false,
        person: null,
        error: action.payload,
      };
    case CREATE_PERSON_RESET:
      return initialState;
    default:
      return state;
  }
};
