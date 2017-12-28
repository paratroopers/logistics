import {onChangeLanguage,GetLoginState} from "../actions/ActionTypes";

const initialState = {
    data: [],
    routerAddress: '',
    isLogin:false
}

export const web = (state = initialState, action) => {
    switch (action.type) {
        case onChangeLanguage:
            return {...state, languageKey: action.payload.languageKey};
        case GetLoginState:
            return {...state, isLogin: action.payload.isLogin}
        default:
            return state;
    }
}
