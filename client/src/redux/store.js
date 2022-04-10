import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { loaderReducer } from "./reducers/loaderReducer";

const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer: loaderReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
