import { AsyncStorage } from 'react-native';

const themeReducer = (state = { mode: false }, action) => {
    switch (action.type) {
        case "CHANGE_MODE":
            return { ...state, mode: !state.mode };
        default:
            return state
    }
}

export default themeReducer;