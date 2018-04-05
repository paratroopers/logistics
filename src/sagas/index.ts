// import {take, put, call, fork, cancel} from "redux-saga/effects";
// import {update_user_avatar} from "../actions/ActionTypes";
// import {delay} from "redux-saga";
//
// function* syncUpdateUserAvatar() {
//     while (true) {
//         let obj = yield take(update_user_avatar);
//         yield call(delay, 1000);
//     }
//
// }
// export default function* rootSaga(): any {
//     yield [
//         fork(syncUpdateUserAvatar),
//     ]
// }
