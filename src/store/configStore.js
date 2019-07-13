import { combineReducers, createStore } from "redux";
import RadiusReducer from "./reducers/radius";

const rootReducer = combineReducers({
  radius: RadiusReducer
});

const store = createStore(rootReducer);

export default store;
