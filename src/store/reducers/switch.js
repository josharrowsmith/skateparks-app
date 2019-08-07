import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../actions/actionTypes";

const initialState = {
  notification: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        notification: true
      };
    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notification: false
      };
    default:
      return state;
  }
};

export default reducer;
