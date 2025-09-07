import { combineReducers } from "redux";
import { getPersonsReducer } from "./get-persons-reducer";
import { createPersonReducer } from "./create-person-reducer";

const rootReducer = combineReducers({
  getPersons: getPersonsReducer,
  createPerson: createPersonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
