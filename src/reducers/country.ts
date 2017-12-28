import {QOUNTRY_COUNTLOADED} from "../actions/ActionTypes";

const initialState = {
    data: []
}

export const country = (state = initialState, action) => {
    switch (action.type) {
        case QOUNTRY_COUNTLOADED:
            return {...state, data: action.payload.data}
        default:
            return state;
    }
}
