import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import templateReducer from "../reducers/templateReducer";


const rootReducer = combineReducers({
  templates: templateReducer,
});

// Define the app state type based on the rootReducer
export type AppState = ReturnType<typeof rootReducer>;

const middleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
