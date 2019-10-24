import { all } from "redux-saga/effects";
import { loginSaga } from "./login.saga";
import { searchSaga } from "./search.saga";

export function* rootSaga() {
  yield all([loginSaga(), searchSaga()]);
}
