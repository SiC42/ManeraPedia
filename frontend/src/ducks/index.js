import { all } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
import search, { searchSaga } from "./search";
import tabs, { tabsSaga } from "./tabs";

const reducers = {
  auth,
  search,
  tabs
};

export function* rootSaga() {
  yield all([authSaga(), searchSaga(), tabsSaga()]);
}

export default reducers;
