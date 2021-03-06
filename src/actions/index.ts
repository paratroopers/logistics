import {createAction} from "redux-actions";
import {
    REQUEST_TASKCOUNT,
    TASK_COUNTLOADED,
    REQUEST_MOBILESELECTTAB,
    ESELECTTAB_COUNTLOADED,
    REQUEST_MOBILENAVTREE,
    NAVTREE_COUNTLOADED,
    QOUNTRY_COUNTLOADED,
    onChangeLanguage,
    GetLoginState,
    props_warehouse_in_model
} from "./ActionTypes";
import {ModelNameSpace} from '../model/model';

export class TaskAction {
    static requestTaskCount = createAction(REQUEST_TASKCOUNT);
    static taskCountLoaded = createAction(TASK_COUNTLOADED, (todoCount: number, claimCount: number) => {
        return {todoCount: todoCount, claimCount: claimCount};
    });
}

export class MobileSelectTabAction {
    static requestSelectTab = createAction(REQUEST_MOBILESELECTTAB);
    static SelectTabLoaded = createAction(ESELECTTAB_COUNTLOADED, (tabName: number) => {
        return {tabName: tabName};
    });
}

export class MobileNavTreeAction {
    static requestSelectTab = createAction(REQUEST_MOBILENAVTREE);
    static SelectTabLoaded = createAction(NAVTREE_COUNTLOADED, (data: any, routerAddress: string) => {
        return {data: data, routerAddress: routerAddress};
    });
}

export class CountryAction {
    static CountryLoaded = createAction(QOUNTRY_COUNTLOADED, (data: any) => {
        return {data: data};
    });
}

export class WebAction {
    /** 多语言*/
    static onChangeLanguage = createAction(onChangeLanguage, (languageKey: string) => {
        return {languageKey: languageKey};
    });

    /** 获取登录状态*/
    static GetLoginState = createAction(GetLoginState, (isLogin: boolean) => {
        return {isLogin: isLogin};
    });

    /** 传递入库订单详情*/
    static props_warehouse_in_model = createAction(props_warehouse_in_model, (model: ModelNameSpace.WarehouseListModel) => {
        return {props_warehouse_in_model: model};
    });
}