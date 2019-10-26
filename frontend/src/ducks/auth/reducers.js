import * as types from "./types";
let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, ...user } : {};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        loggingIn: true,
        info: action.payload
      };
    case types.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        ...action.payload
      };
    case types.LOGIN_FAILURE:
      return {};
    case types.LOGOUT:
      return {};
    case types.LOGIN_NEEDED:
      return { ...state, ...action.payload, loginError: true };
    case types.LOGIN_ERROR_CLEARED:
      return { ...state, loginError: false };
    case types.REFRESH_TOKEN:
      return { ...state, pendingRefreshingToken: true };
    case types.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        access_token: action.payload,
        pendingRefreshingToken: false
      };
    default:
      return state;
  }
}
