import {onChangeLanguage} from "../actions/ActionTypes";

const initialState = {
    data: [],
    routerAddress: ''
}

export const web = (state = initialState, action) => {
    switch (action.type) {
        case onChangeLanguage:
            return {...state, languageKey: action.payload.languageKey}
        default:
            return state;
    }
}
