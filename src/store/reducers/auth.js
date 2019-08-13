import {
  SESSION_ERROR,
  SESSION_LOADING,
  SESSION_RESTORING,
  SESSION_LOGOUT,
  SESSION_SUCCESS,
  SIGNUP_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  restoring: false,
  loading: false,
  user: {},
  error: null,
  logged: null,
  registered: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_RESTORING:
      return { ...state, restoring: true };
    case SESSION_LOADING:
      return { ...state, restoring: false, loading: true, error: null };
    case SESSION_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: true,
        registered: null
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: action.user,
        error: null,
        logged: null,
        registered: true
      };
    case SESSION_ERROR:
      return {
        ...state,
        restoring: false,
        loading: false,
        user: null,
        error: action.error,
        logged: null,
        registered: null
      };
    case SESSION_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
