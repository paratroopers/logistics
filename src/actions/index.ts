import {createAction} from "redux-actions";
import {REQUEST_TASKCOUNT, TASK_COUNTLOADED} from "./ActionTypes";

export class TaskAction {
    static requestTaskCount = createAction(REQUEST_TASKCOUNT);
    static taskCountLoaded = createAction(TASK_COUNTLOADED, (todoCount: number, claimCount: number) => {
        return {todoCount: todoCount, claimCount: claimCount};
    });
}