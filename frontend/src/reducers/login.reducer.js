import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REFRESH_TOKEN,
  REFRESH_TOKEN_SUCCESS
} from "../constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, ...user } : {};

export function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        info: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        ...action.payload
      };
    case LOGIN_FAILURE:
      return {};
    case LOGOUT:
      return {};
    case REFRESH_TOKEN:
      return { ...state, pendingRefreshingToken: true };
    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        access_token: action.payload,
        pendingRefreshingToken: false
      };
    default:
      return state;
  }
}
