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
    GetLoginState
} from "./ActionTypes";

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
    static onChangeLanguage = createAction(onChangeLanguage, (languageKey: string) => {
        return {languageKey: languageKey};
    });

    static GetLoginState = createAction(GetLoginState, (isLogin: boolean) => {
        return {isLogin: isLogin};
    });
}