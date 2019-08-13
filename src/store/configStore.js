import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RadiusReducer from "./reducers/radius";
import SwitchReducer from "./reducers/switch";
import AuthReducer from "./reducers/auth";

const rootReducer = combineReducers({
  radius: RadiusReducer,
  notification: SwitchReducer,
  auth: AuthReducer
});

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
