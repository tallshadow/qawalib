// src/reducers/index.ts
import { combineReducers } from "redux";
import templateReducer from "./templateReducer";

const rootReducer = combineReducers({
  templates: templateReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
