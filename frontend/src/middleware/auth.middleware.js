import { authOperations, authTypes } from "ducks/auth";
import { loginService } from "../services/auth.service";
import {
  ACCESS_TOKEN,
  authNeeded,
  getAuthMetaType,
  getAuthHeader,
  REFRESH_TOKEN
} from "helpers/auth";
import jwt_decode from "jwt-decode";

let buffer = [];

export const authMiddleware = ({ dispatch, getState }) => next => action => {
  // Catch specific actions
  if (action.type === authTypes.REFRESH_TOKEN_SUCCESS) {
    buffer.forEach(a => next(actionWithAuthHeader(a, action.payload)));
    buffer = [];
  }
  if (action.type === authTypes.LOGOUT) {
    loginService.logout();

  // Pass on actions that do not need any kind of authentication(-header)
  if (!authNeeded(action)) {
    return next(action);
  }

  let state = getState();

  // Catch actions which need the refresh token
  if (getAuthMetaType(action) === REFRESH_TOKEN) {
    next(actionWithAuthHeader(action, state.login.refresh_token));
  }

  // Catch actions which need the access token
  if (getAuthMetaType(action) === ACCESS_TOKEN) {
    if (!state.login) {
      // We are not logged in
      return next(action);
    }
    if (tokenExpired(state)) {
      buffer.push(action);
      dispatch(authOperations.refreshToken(state.login.refresh_token));
    } else {
      return next(actionWithAuthHeader(action, state.login.access_token));
    }
  }
};

function tokenExpired(state) {
  // decode jwt so that we know if and when it expires
  const tokenExpiration = jwt_decode(state.login.access_token).exp;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return tokenExpiration && tokenExpiration - nowInSeconds < 10;
}

function actionWithAuthHeader(action, token) {
  const actionWithAuthHeader = Object.assign({}, action);
  actionWithAuthHeader.payload.Authorization = getAuthHeader(token);
  return actionWithAuthHeader;
}
