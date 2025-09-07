import { combineReducers } from "redux";

import { getPersonsReducer } from "./get-persons-reducer";
import { createPersonReducer } from "./create-person-reducer";
import { deletePersonReducer } from "./delete-person-reducer";
import { updatePersonReducer } from "./update-person-reducer";

const rootReducer = combineReducers({
  getPersons: getPersonsReducer,
  createPerson: createPersonReducer,
  deletePerson: deletePersonReducer,
  updatePerson: updatePersonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
