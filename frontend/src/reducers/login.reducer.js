import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function login(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {};
    default:
      return state
  }
}