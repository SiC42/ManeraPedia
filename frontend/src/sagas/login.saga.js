import { LOGIN_REQUEST, REFRESH_TOKEN } from "../constants";
import { loginService } from "../services";
import { put, call, takeEvery, takeLeading } from "redux-saga/effects";
import { loginActions } from "../actions/login.actions";
import { getAuthHeader } from "../helpers";

function* loginUser(action) {
  try {
    const user = yield call(
      loginService.login,
      action.payload.username,
      action.payload.password
    );
    yield put(loginActions.loginSuccess(user));
  } catch (e) {
    yield put(loginActions.loginFailure(e));
  }
}

function* refreshToken(action) {
  try {
    const token = yield call(
      loginService.refreshToken,
      getAuthHeader(action.payload)
    );
    yield put(loginActions.refreshTokenSuccess(token));
  } catch (e) {
    yield put(loginActions.refreshTokenFailure(e));
  }
}

export function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
  yield takeLeading(REFRESH_TOKEN, refreshToken);
}
