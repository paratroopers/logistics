import {take, put, call, fork} from "redux-saga/effects";
import {WebAction} from '../actions/index';
import {REQUEST_WAITPAYCOUNT, onRunSagaDemo} from '../actions/ActionTypes';
import {APINameSpace} from '../model/api';
import {delay} from 'redux-saga';

export function* fetchUnPayData() {
    while (true) {
        yield take(REQUEST_WAITPAYCOUNT);
        const data = yield call(APINameSpace.CustomerOrderAPI.CustomerOrderUnPayCount);
        if (data.Status === 0) yield put(WebAction.waitPayCountLoaded(data));
        call(delay, 20000);
    }
}

export function* fetchOnRunSagaDemo() {
    while (true) {
        const demo = yield take(onRunSagaDemo);
        console.log(demo);
    }
}

export default function* rootSaga(): any {
    yield [
        fork(fetchUnPayData),
        fork(fetchOnRunSagaDemo)
    ]
}

