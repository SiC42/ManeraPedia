import axios from "axios";
import config from "config";

export const loginService = {
  login,
  logout,
  refreshToken
  //TODO: register,
};

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ username, password });
  return axios
    .post(`${config.apiUrl}/login`, body, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch(handleError);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function refreshToken(refreshToken) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: refreshToken
    }
  };
  return axios(`${config.apiUrl}/refresh`, requestOptions)
    .then(handleResponse)
    .then(data => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let user = JSON.parse(localStorage.getItem("user"));
      user.access_token = data.access_token;
      localStorage.setItem("user", JSON.stringify(user));
      return data.access_token;
    })
    .catch(handleError);
}

function handleError(error) {
  if (error.response) {
    console.log(error.toJSON());
    return Promise.reject(error.toJSON());
  }
}

function handleResponse(response) {
  console.log(response);
  return response.data;
}
