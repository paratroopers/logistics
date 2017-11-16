import {TASK_COUNTLOADED} from "../actions/ActionTypes";
const initialState = {
    todoCount: 0,
    claimCount: 0
}

export const task = (state = initialState, action) => {
    switch (action.type) {
        case TASK_COUNTLOADED:
            return {...state, todoCount: action.payload.todoCount, claimCount: action.payload.claimCount}
        default:
            return state;
    }
}
