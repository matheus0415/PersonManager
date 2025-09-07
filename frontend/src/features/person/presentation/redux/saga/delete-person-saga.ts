import { call, put, takeEvery } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  deletePersonSuccess,
  deletePersonError,
} from "../actions/delete-person-actions";
import { DeletePersonService } from "@/features/person/service/delete-person-service";
import { DELETE_PERSON_REQUEST } from "../types/delete-person-types";
import type { DeletePersonRequestAction } from "../reducers/delete-person-reducer";

function* deletePersonSaga(action: DeletePersonRequestAction): SagaIterator {
  try {
    const service = new DeletePersonService();
    yield call([service, service.delete], action.payload);
    yield put(deletePersonSuccess());
  } catch (error: unknown) {
    let errorMessage = "Erro ao deletar pessoa";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    yield put(deletePersonError(errorMessage));
  }
}

export function* watchDeletePerson() {
  yield takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga);
}
