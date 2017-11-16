import {EVAN_LOADED} from "../actions/ActionTypes";

const initialState = {
    data: []
}

export const evan = (state = initialState, action) => {
    switch (action.type) {
        case EVAN_LOADED:
            return {
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}
