import { call, put, takeEvery } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  createPersonSuccess,
  createPersonError,
} from "../actions/create-person-actions";
import { CreatePersonService } from "../../../service/create-person-service";
import { CreatePersonRepository } from "../../../data/repositories/create-person-repository";
import { CreatePersonController } from "../../controllers/create-person-controller";
import type { CreatePersonRequestAction } from "../reducers/create-person-reducer";
import { CREATE_PERSON_REQUEST } from "../types/create-person-types";

function* createPersonSaga(action: CreatePersonRequestAction): SagaIterator {
  try {
    const service = new CreatePersonService();
    const repository = new CreatePersonRepository(service);
    const controller = new CreatePersonController(repository);
    const persons = yield call([controller, controller.create], action.payload);
    yield put(createPersonSuccess(persons));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch persons";
    yield put(createPersonError(message));
  }
}

export function* watchCreatePerson() {
  yield takeEvery(CREATE_PERSON_REQUEST, createPersonSaga);
}
