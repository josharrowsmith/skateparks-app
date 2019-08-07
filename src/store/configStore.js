import { combineReducers, createStore } from "redux";
import RadiusReducer from "./reducers/radius";
import SwitchReducer from "./reducers/switch";

const rootReducer = combineReducers({
  radius: RadiusReducer,
  notification: SwitchReducer
});

const store = createStore(rootReducer);

export default store;
