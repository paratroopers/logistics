import {ESELECTTAB_COUNTLOADED} from "../actions/ActionTypes";

const initialState = {
    tabName: 0
}

export const tab = (state = initialState, action) => {
    switch (action.type) {
        case ESELECTTAB_COUNTLOADED:
            return {...state, tabName: action.payload.tabName}
        default:
            return state;
    }
}
