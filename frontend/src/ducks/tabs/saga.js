import { delay, put, takeEvery } from "redux-saga/effects";
import * as tabActions from "./actions";
import * as types from "./types";

function* delayRemoveTab(action) {
  yield delay(300);
  yield put(tabActions.remove(action.payload));
}

export default function* tabsSaga() {
  yield takeEvery(types.REMOVE_TAB_DELAYED, delayRemoveTab);
}
