import {createAction} from "redux-actions";
import {REQUEST_EVAN,EVAN_LOADED} from "./ActionTypes";

export class EvanAction {
    static requestEvan = createAction(REQUEST_EVAN);
    static evanLoaded = createAction(EVAN_LOADED, (data:any) => {
        return {data: data};
    });
}