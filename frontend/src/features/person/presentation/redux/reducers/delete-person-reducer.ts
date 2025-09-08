import {
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_ERROR,
  DELETE_PERSON_RESET,
} from "../types/delete-person-types";
import type { RequestStatusState } from "@/app/rootState";

export interface DeletePersonRequestAction {
  type: typeof DELETE_PERSON_REQUEST;
  payload: number;
}

export interface DeletePersonSuccessAction {
  type: typeof DELETE_PERSON_SUCCESS;
}

export interface DeletePersonErrorAction {
  type: typeof DELETE_PERSON_ERROR;
  payload: string;
}

export interface DeletePersonResetAction {
  type: typeof DELETE_PERSON_RESET;
}

export type DeletePersonActionTypes =
  | DeletePersonRequestAction
  | DeletePersonSuccessAction
  | DeletePersonErrorAction
  | DeletePersonResetAction;

const initialState: RequestStatusState = {
  loading: false,
  error: null,
};

export const deletePersonReducer = (
  state: RequestStatusState = initialState,
  action: DeletePersonActionTypes
): RequestStatusState => {
  switch (action.type) {
    case DELETE_PERSON_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_PERSON_SUCCESS:
      return { ...state, loading: false, error: null };
    case DELETE_PERSON_ERROR:
      return { ...state, loading: false, error: action.payload };
    case DELETE_PERSON_RESET:
      return initialState;
    default:
      return state;
  }
};
