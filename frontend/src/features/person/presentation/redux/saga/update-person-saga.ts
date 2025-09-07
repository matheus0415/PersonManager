import { call, put, takeEvery } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  updatePersonSuccess,
  updatePersonError,
} from "../actions/update-person-actions";
import { UpdatePersonService } from "@/features/person/service/update-person-service";
import { UPDATE_PERSON_REQUEST } from "../types/update-person-types";
import type { UpdatePersonRequestAction } from "../reducers/update-person-reducer";

function* updatePersonSaga(action: UpdatePersonRequestAction): SagaIterator {
  try {
    const service = new UpdatePersonService();
    const { id, params } = action.payload;
    const response = yield call([service, service.update], id, params);
    yield put(updatePersonSuccess(response));
  } catch (error) {
    let errorMessage = "Erro ao atualizar pessoa";
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    yield put(updatePersonError(errorMessage));
  }
}

export function* watchUpdatePerson() {
  yield takeEvery(UPDATE_PERSON_REQUEST, updatePersonSaga);
}
