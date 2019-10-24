import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE
} from "../constants";
import { loginService } from "../services";

export const loginActions = {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure
  //TODO: register,
};
function loginRequest(username, password) {
  return { type: LOGIN_REQUEST, payload: { username, password } };
}
function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, payload: user };
}
function loginFailure(error) {
  return { type: LOGIN_FAILURE, payload: error };
}

function logout() {
  loginService.logout();
  return { type: LOGOUT };
}

function refreshToken(refreshToken) {
  return { type: REFRESH_TOKEN, payload: refreshToken };
}
function refreshTokenSuccess(accessToken) {
  return { type: REFRESH_TOKEN_SUCCESS, payload: accessToken };
}
function refreshTokenFailure(accessToken) {
  return { type: REFRESH_TOKEN_FAILURE, payload: accessToken };
}
