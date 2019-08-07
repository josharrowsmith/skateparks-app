import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "./actionTypes";

export const setNotifications = notification => {
  return {
    type: SET_NOTIFICATION,
    notification
  };
};

export const removeNotifications = notification => {
  return {
    type: REMOVE_NOTIFICATION,
    notification
  };
};
