import { AsyncStorage } from 'react-native';
import { CHANGE_MODE } from "./actionTypes"


export function changeMode(theme) {
    return dispatch => {
        dispatch({ type: CHANGE_MODE });
    };
}

export const saveDataToStorage = (theme) => {
    return dispatch => {
        AsyncStorage.setItem('theme', JSON.stringify({ theme }))
    }
};
