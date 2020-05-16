import { SET_RADIUS } from "./actionTypes";
import { AsyncStorage } from 'react-native';

export const setRadius = radius => {
  return dispatch => {
    dispatch({ type: SET_RADIUS, radius });
    dispatch(saveRadiusToStorage())
  }
};


export const saveRadiusToStorage = (dispatch, getState) => {
  return async (dispatch, getState) => {
    const radius = getState().radius;
    AsyncStorage.setItem('radius', JSON.stringify({ radius }))
  }
};
