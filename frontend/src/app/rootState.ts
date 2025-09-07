export interface RequestStatusState {
  loading: boolean;
  error: string | null;
}

export const initialState: RequestStatusState = {
  loading: false,
  error: null,
};

export interface CreatePersonState extends RequestStatusState {
  person: import("@/features/person/domain/models/person").Person | null;
}

export interface GetPersonsState extends RequestStatusState {
  persons: import("@/features/person/domain/models/person").Person[];
}
