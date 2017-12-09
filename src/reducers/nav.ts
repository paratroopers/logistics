import {NAVTREE_COUNTLOADED} from "../actions/ActionTypes";

const initialState = {
    data: []
}

export const nav = (state = initialState, action) => {
    switch (action.type) {
        case NAVTREE_COUNTLOADED:
            return {...state, data: action.payload.data}
        default:
            return state;
    }
}
