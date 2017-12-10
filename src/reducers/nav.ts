import {NAVTREE_COUNTLOADED} from "../actions/ActionTypes";

const initialState = {
    data: [],
    routerAddress: ''
}

export const nav = (state = initialState, action) => {
    switch (action.type) {
        case NAVTREE_COUNTLOADED:
            return {...state, data: action.payload.data, routerAddress: action.payload.routerAddress}
        default:
            return state;
    }
}
