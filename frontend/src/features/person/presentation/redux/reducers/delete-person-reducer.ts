import {
  DELETE_PERSON_REQUEST,
  DELETE_PERSON_SUCCESS,
  DELETE_PERSON_ERROR,
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

export type DeletePersonActionTypes =
  | DeletePersonRequestAction
  | DeletePersonSuccessAction
  | DeletePersonErrorAction;

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
    default:
      return state;
  }
};
