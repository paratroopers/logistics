import {NAVTREE_COUNTLOADED} from "../actions/ActionTypes";

const initialState = {
    showModal: 0
}

export const nav = (state = initialState, action) => {
    switch (action.type) {
        case NAVTREE_COUNTLOADED:
            return {...state, showModal: action.payload.showModal}
        default:
            return state;
    }
}
