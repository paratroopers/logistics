import {createAction} from "redux-actions";
import {
    REQUEST_TASKCOUNT,
    TASK_COUNTLOADED,
    REQUEST_MOBILESELECTTAB,
    ESELECTTAB_COUNTLOADED,
    REQUEST_MOBILENAVTREE,
    NAVTREE_COUNTLOADED
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
    static SelectTabLoaded = createAction(NAVTREE_COUNTLOADED, (showModal: boolean) => {
        return {showModal: showModal};
    });
}