import { SET_LOCATION } from "./actionTypes";

export const setLocation = location => {
    return dispatch => {
        dispatch({ type: SET_LOCATION, location });
    }
};
