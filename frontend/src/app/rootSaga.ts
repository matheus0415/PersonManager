import { all } from "redux-saga/effects";
import { watchCreatePerson } from "@/features/person/presentation/redux/saga/create-person-saga";
import { watchGetPersons } from "@/features/person/presentation/redux/saga/get-persons-saga";

export default function* rootSaga() {
  yield all([watchCreatePerson(), watchGetPersons()]);
}
