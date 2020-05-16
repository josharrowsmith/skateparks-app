import { AsyncStorage } from 'react-native';
import { CHANGE_MODE } from "./actionTypes"


export function changeMode(theme) {
    return dispatch => {
        dispatch({ type: CHANGE_MODE });
        dispatch(saveDataToStorage())
    };
}

export const saveDataToStorage = (dispatch, getState) => {
    return async (dispatch, getState) => {
        const theme = getState().theme;
        AsyncStorage.setItem('theme', JSON.stringify({ theme }))
    }
};
