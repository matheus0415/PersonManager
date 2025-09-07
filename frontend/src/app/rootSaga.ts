import { all } from "redux-saga/effects";
import { watchCreatePerson } from "@/features/person/presentation/redux/saga/create-person-saga";
import { watchGetPersons } from "@/features/person/presentation/redux/saga/get-persons-saga";
import { watchDeletePerson } from "@/features/person/presentation/redux/saga/delete-person-saga";

export default function* rootSaga() {
  yield all([watchCreatePerson(), watchGetPersons(), watchDeletePerson()]);
}
