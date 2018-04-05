import {take, put, call, fork, cancel} from "redux-saga/effects";
import {REQUEST_WAITPAYCOUNT} from '../actions/ActionTypes';
import {APINameSpace} from '../model/api';

export function* fetchUnPayData(action) {
    try {
        const data = yield call(APINameSpace.CustomerOrderAPI.CustomerOrderUnPayCount, action.payload.url);
        yield put({type: REQUEST_WAITPAYCOUNT, data});
    } catch (error) {
        yield put({type: REQUEST_WAITPAYCOUNT, error});
    }
}

export default function* rootSaga(): any {
    yield [
        fork(fetchUnPayData),
    ]
}

