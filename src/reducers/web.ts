import {onChangeLanguage,GetLoginState,props_warehouse_in_model} from "../actions/ActionTypes";
import {ModelNameSpace} from '../model/model';

/** 初始化默认值*/
const initialState = {
    data: [],
    routerAddress: '',
    isLogin: false,
    props_warehouse_in_model: null
}

export const web = (state = initialState, action) => {
    switch (action.type) {
        /** 多语言*/
        case onChangeLanguage:
            return {...state, languageKey: action.payload.languageKey};
        /** 获取登录状态*/
        case GetLoginState:
            return {...state, isLogin: action.payload.isLogin};
        /** 传递入库订单详情*/
        case props_warehouse_in_model:
            return {...state, props_warehouse_in_model: action.payload.props_warehouse_in_model};
        default:
            return state;
    }
}
