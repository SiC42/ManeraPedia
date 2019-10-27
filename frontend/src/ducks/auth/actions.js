import { REFRESH_TOKEN, addAuthNeededMeta } from "helpers/auth";
import * as types from "./types";

function loginNeeded(error) {
  return { type: types.LOGIN_NEEDED, payload: error };
}

function loginRequest(username, password) {
  return { type: types.LOGIN_REQUEST, payload: { username, password } };
}
function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, payload: user };
}
function loginFailure(error) {
  return { type: types.LOGIN_FAILURE, payload: error };
}

function clearLoginError() {
  return { type: types.LOGIN_ERROR_CLEARED };
}

function logout() {
  return { type: types.LOGOUT };
}

function refreshToken() {
  return {
    type: types.REFRESH_TOKEN,
    meta: addAuthNeededMeta(REFRESH_TOKEN)
  };
}
function refreshTokenSuccess(accessToken) {
  return { type: types.REFRESH_TOKEN_SUCCESS, payload: accessToken };
}
function refreshTokenFailure(accessToken) {
  return { type: types.REFRESH_TOKEN_FAILURE, payload: accessToken };
}

export {
  loginNeeded,
  loginRequest,
  loginSuccess,
  loginFailure,
  clearLoginError,
  logout,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure
  // TODO: register,
};
