import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../constants";
import { loginService } from "../services";

export const loginActions = {
  login,
  logout
  //TODO: register,
};

function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));
    loginService.login(username, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(user) {
    return { type: LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: LOGIN_FAILURE, error };
  }
}

function logout() {
  loginService.logout();
  return { type: LOGOUT };
}
