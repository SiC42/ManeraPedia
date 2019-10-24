import * as types from "./types";

export {
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
  return { type: types.LOGIN_REQUEST, payload: { username, password } };
}
function loginSuccess(user) {
  return { type: types.LOGIN_SUCCESS, payload: user };
}
function loginFailure(error) {
  return { type: types.LOGIN_FAILURE, payload: error };
}

function logout() {
  return { type: types.LOGOUT };
}

function refreshToken(refreshToken) {
  return { type: types.REFRESH_TOKEN, payload: refreshToken };
}
function refreshTokenSuccess(accessToken) {
  return { type: types.REFRESH_TOKEN_SUCCESS, payload: accessToken };
}
function refreshTokenFailure(accessToken) {
  return { type: types.REFRESH_TOKEN_FAILURE, payload: accessToken };
}
