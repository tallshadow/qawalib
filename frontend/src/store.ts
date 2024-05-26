import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import templateReducer from './reducers/templateReducer';

const rootReducer = combineReducers({
  templates: templateReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
