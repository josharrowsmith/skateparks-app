import { SET_LOCATION } from "./actionTypes";

export const setLocation = (lat, long) => {
    location = {
        latitude: lat,
        longitude: long
    }
    return dispatch => {
        dispatch({ type: SET_LOCATION, location });
    }
};
