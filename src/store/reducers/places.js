import { ADD_PLACE, SET_PLACES } from "../actions/actionTypes"

const initialState = {
    places: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            return {
                ...state,
                places: action.places
            };
        default:
            return state;
    }
};
