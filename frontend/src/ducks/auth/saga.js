import { put, call, takeEvery, takeLeading } from "redux-saga/effects";
import * as types from "./types";
import { login, logout, refreshToken } from "./services";
import * as authActions from "./actions";

function* loginUser(action) {
  try {
    const user = yield call(
      login,
      action.payload.username,
      action.payload.password
    );
    yield put(authActions.loginSuccess(user));
  } catch (e) {
    yield put(authActions.loginFailure(e));
  }
}

function logoutUser() {
  try {
    logout();
  } catch (e) {
    console.error(e);
  }
}

function* tryRefreshToken(action) {
  try {
    const token = yield call(refreshToken, action.payload.Authorization);
    yield put(authActions.refreshTokenSuccess(token));
  } catch (e) {
    yield put(authActions.refreshTokenFailure(e));
  }
}

export default function* authSaga() {
  yield takeEvery(types.LOGOUT, logoutUser);
  yield takeEvery(types.LOGIN_REQUEST, loginUser);
  yield takeLeading(types.REFRESH_TOKEN, tryRefreshToken);
}
