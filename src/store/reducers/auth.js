import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from '../actions/actionTypes'

const initialState = {
    token: null,
    userId: null,
    didTryAutoLogin: false,
    admin: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                refresh: action.refresh,
                userId: action.userId,
                email: action.email,
                didTryAutoLogin: true,
                admin: action.admin
            };
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            };
        case LOGOUT:
            return {
                ...initialState,
                didTryAutoLogin: false
            }
        default:
            return state;
    }
};
