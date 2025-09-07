import { call, put, takeEvery } from "redux-saga/effects";
import type { SagaIterator } from "redux-saga";
import {
  getPersonsSuccess,
  getPersonsError,
} from "../actions/get-persons-actions";
import { GetPersonsService } from "../../../service/get-persons-service";
import { GetPersonsRepository } from "../../../data/repositories/get-persons-repository";
import { GetPersonsController } from "../../controllers/get-persons-controller";
import { GET_PERSONS_REQUEST } from "../types/get-persons-types";

function* getPersonsSaga(): SagaIterator {
  try {
    const service = new GetPersonsService();
    const repository = new GetPersonsRepository(service);
    const controller = new GetPersonsController(repository);
    const persons = yield call([controller, controller.getAll]);
    yield put(getPersonsSuccess(persons));
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch persons";
    yield put(getPersonsError(message));
  }
}

export function* watchGetPersons() {
  yield takeEvery(GET_PERSONS_REQUEST, getPersonsSaga);
}
