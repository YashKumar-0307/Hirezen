import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { jobsReducer } from "./reducers/jobsReducer";
import { postedReducer } from "./reducers/postedReducer";
import { appliedReducer } from "./reducers/appliedReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { loaderReducer } from "./reducers/loaderReducer";
import { usersReducer } from "./reducers/usersReducer";

const rootReducer = combineReducers({
  jobsReducer: jobsReducer,
  loaderReducer: loaderReducer,
  usersReducer: usersReducer,
  appliedReducer: appliedReducer,
  postedReducer : postedReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
