import jwt_decode from "jwt-decode";
import { authOperations, authTypes } from "ducks/auth";
import { searchTypes } from "ducks/search";
import { getAuthHeader } from "../helpers";
import { loginService } from "../services/auth.service";

let buffer = [];
const authNeededActionTypes = [searchTypes.AUTOCOMPLETE_REQUEST];

export const authMiddleware = ({ dispatch, getState }) => next => action => {
  let state = getState();
  if (action.type === authTypes.REFRESH_TOKEN) {
    next(actionWithHeader(action, state.login.refresh_token));
  }
  if (action.type === authTypes.REFRESH_TOKEN_SUCCESS) {
    buffer.forEach(a => next(actionWithHeader(a, action.payload)));
    buffer = [];
  }
  if (action.type === authTypes.LOGOUT) {
    loginService.logout();
  }

  if (authNeededActionTypes.includes(action.type)) {
    if (tokenExpired(state)) {
      buffer.push(action);
      dispatch(authOperations.refreshToken(state.login.refresh_token));
    } else {
      return next(actionWithHeader(action, state.login.access_token));
    }
  }
  return next(action);
};

function tokenExpired(state) {
  if (state.login && state.login.access_token && state.login.refresh_token) {
    // decode jwt so that we know if and when it expires
    const tokenExpiration = jwt_decode(state.login.access_token).exp;
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return tokenExpiration && tokenExpiration - nowInSeconds < 10;
  } else {
    return false;
  }
}

function actionWithHeader(action, access_token) {
  const actionWithAuthHeader = Object.assign({}, action);
  actionWithAuthHeader.payload.Authorization = getAuthHeader(access_token);
  return actionWithAuthHeader;
}
