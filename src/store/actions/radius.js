import { SET_RADIUS } from "./actionTypes";

export const setRadius = radius => {
  return {
    type: SET_RADIUS,
    radius
  };
};
