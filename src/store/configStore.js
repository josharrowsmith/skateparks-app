import { AsyncStorage } from "react-native";
import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RadiusReducer from "./reducers/radius";
import PlacesReducer from "./reducers/places"
import themeReducer from "./reducers/theme"
import AuthReducer from "./reducers/auth"

const rootReducer = combineReducers({
  radius: RadiusReducer,
  places: PlacesReducer,
  theme: themeReducer,
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
