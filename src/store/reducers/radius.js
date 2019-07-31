import { SET_RADIUS, REMOVE_RADIUS } from "../actions/actionTypes";

const initialState = {
  radius: 5
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RADIUS:
      return {
        ...state,
        radius: action.radius
      };
    case REMOVE_RADIUS:
      return {
        ...state,
        radius: null
      };
    default:
      return state;
  }
};

export default reducer;
