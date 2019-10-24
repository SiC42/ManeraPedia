import { AUTOCOMPLETE_REQUEST, REFRESH_TOKEN_SUCCESS } from "../constants";
import jwt_decode from "jwt-decode";
import { loginActions } from "../actions/login.actions";
import { getAuthHeader } from "../helpers";

let buffer = [];
export const authMiddleware = ({ dispatch, getState }) => next => action => {
  let state = getState();
  if (action.type === REFRESH_TOKEN_SUCCESS) {
    buffer.forEach(a => next(actionWithHeader(a, action.payload)));
    buffer = [];
  }

  const authNeededActionTypes = [AUTOCOMPLETE_REQUEST];
  if (!authNeededActionTypes.includes(action.type)) {
    return next(action);
  }
  if (state.login && state.login.access_token && state.login.refresh_token) {
    if (tokenExpired(state.login.access_token)) {
      buffer.push(action);
      dispatch(loginActions.refreshToken(state.login.refresh_token));
    } else {
      return next(actionWithHeader(action, state.login.access_token));
    }
  }
};

function actionWithHeader(action, access_token) {
  const actionWithAuthHeader = Object.assign({}, action);
  actionWithAuthHeader.payload.Authorization = getAuthHeader(access_token);
  return actionWithAuthHeader;
}

function tokenExpired(access_token) {
  // decode jwt so that we know if and when it expires
  const tokenExpiration = jwt_decode(access_token).exp;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return tokenExpiration && tokenExpiration - nowInSeconds < 10;
}
