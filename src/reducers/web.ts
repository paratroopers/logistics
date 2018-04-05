import {onChangeLanguage, GetLoginState, props_warehouse_in_model, update_user_avatar} from "../actions/ActionTypes";
import {ModelNameSpace} from '../model/model';

/** 初始化默认值*/
const initialState = {
    data: [],
    routerAddress: '',
    isLogin: false,
    props_warehouse_in_model: null,
    avatarUrl: ''
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
        /** 更新用户头像*/
        case update_user_avatar:
            /** 更新用户信息*/
            let userModel: ModelNameSpace.UserModel = JSON.parse(window.localStorage.getItem('UserInfo'));
            userModel.userInfo.HeaderURL = action.payload.avatarUrl;
            window.localStorage.setItem('UserInfo', JSON.stringify(userModel));
            return {...state, avatarUrl: action.payload.avatarUrl};
        default:
            return state;
    }
}
