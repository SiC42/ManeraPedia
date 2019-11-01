import { authOperations, authTypes } from "ducks/auth";
import {
  ACCESS_TOKEN,
  authNeeded,
  getAuthMetaType,
  getAuthHeader,
  REFRESH_TOKEN
} from "helpers/auth";
import jwtDecode from "jwt-decode";

function tokenExpired(state) {
  // decode jwt so that we know if and when it expires
  const tokenExpiration = jwtDecode(state.auth.access_token).exp;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return tokenExpiration && tokenExpiration - nowInSeconds < 10;
}

function getActionWithAuthHeader(action, token) {
  const actionWithAuthHeader = { ...action };
  if (actionWithAuthHeader.payload) {
    actionWithAuthHeader.payload.Authorization = getAuthHeader(token);
  } else {
    actionWithAuthHeader.payload = { Authorization: getAuthHeader(token) };
  }

  return actionWithAuthHeader;
}

let buffer = [];
export default ({ dispatch, getState }) => next => action => {
  // Catch specific actions
  if (action.type === authTypes.REFRESH_TOKEN_SUCCESS) {
    buffer.forEach(a => next(getActionWithAuthHeader(a, action.payload)));
    buffer = [];
  }

  // Pass on actions that do not need any kind of authentication(-header)
  if (!authNeeded(action)) {
    return next(action);
  }

  const state = getState();

  // Catch actions which need the refresh token
  if (getAuthMetaType(action) === REFRESH_TOKEN) {
    return next(getActionWithAuthHeader(action, state.auth.refresh_token));
  }

  // Catch actions which need the access token
  if (getAuthMetaType(action) === ACCESS_TOKEN) {
    if (!state.auth) {
      // We are not logged in
      return next(action);
    }
    if (tokenExpired(state)) {
      buffer.push(action);
      dispatch(authOperations.refreshToken());
    } else {
      return next(getActionWithAuthHeader(action, state.auth.access_token));
    }
  }
};
