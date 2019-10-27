import axios from "axios";
import config from "config";

function handleHttpErrors(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.request);
    console.log(error.response);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  return Promise.reject(error.toJSON());
}

function handleResponse(response) {
  console.log(response);
  return response.data;
}

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  };
  const body = JSON.stringify({ username, password });
  console.log("Trying to log in");
  return axios
    .post(`${config.apiUrl}/login`, body, requestOptions)
    .then(handleResponse)
    .then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch(handleHttpErrors);
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function refreshToken(token) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token
    }
  };
  return axios(`${config.apiUrl}/refresh`, requestOptions)
    .then(handleResponse)
    .then(data => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const user = JSON.parse(localStorage.getItem("user"));
      user.access_token = data.access_token;
      localStorage.setItem("user", JSON.stringify(user));
      return data.access_token;
    })
    .catch(handleHttpErrors);
}

export {
  login,
  logout,
  refreshToken
  // TODO: register,
};
