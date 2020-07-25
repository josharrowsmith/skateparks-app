import { ADD_PLACE, GET_PLACES, STORE_URLS, STORE_lOCATION, STORE_DETAILS, REMOVE_STORE } from "../actions/actionTypes"

const initialState = {
    places: [],
    urls: [],
    location: {},
    details: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACES:
            return {
                ...state,
                places: action.places
            };
        case STORE_URLS:
            return {
                ...state,
                urls: action.urls,
            };
        case STORE_lOCATION:
            return {
                ...state,
                location: action.location
            }
        case STORE_DETAILS:
            return {
                ...state,
                details: action.details
            }
        case REMOVE_STORE:
            return {
                places: action.places,
                urls: [],
                location: {},
                details: {},
            }
        default:
            return state;
    }
};
