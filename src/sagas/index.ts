import {take, put, call, fork} from "redux-saga/effects";
import {WebAction} from '../actions/index';
import {REQUEST_WAITPAYCOUNT} from '../actions/ActionTypes';
import {APINameSpace} from '../model/api';
import {delay} from 'redux-saga';

function* fetchUnPayData() {
    while (true) {
        yield take(REQUEST_WAITPAYCOUNT);
        const data = yield call(APINameSpace.CustomerOrderAPI.CustomerOrderUnPayCount);
        if (data.Status === 0) yield put(WebAction.waitPayCountLoaded(data.Data));
        call(delay, 20000);
    }
}

export default function* rootSaga(): any {
    yield [
        fork(fetchUnPayData)
    ]
}

