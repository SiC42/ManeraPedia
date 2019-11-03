import axios from "axios";
import config from "config";

function handleError(error) {
  if (error.response) {
    console.error(error.toJSON());
    return Promise.reject(error.toJSON());
  }
  return error;
}

function handleResponse(response) {
  return response.data;
}

function autocomplete(phrase, accessToken) {
  const headers = {
    Accept: "application/json",
    Authorization: accessToken
  };
  return axios
    .create({
      headers
    })
    .get(`${config.apiUrl}/search`, {
      params: { query: phrase, autosuggest: true }
    })
    .then(handleResponse)
    .then(suggestions => {
      return suggestions;
    })
    .catch(handleError);
}

function getArticle(options) {
  const { title, Authorization, tryExact } = options;
  const headers = {
    Accept: "application/json",
    Authorization
  };
  return axios
    .create({
      headers
    })
    .get(`${config.apiUrl}/article`, {
      params: { title, tryExact }
    })
    .then(handleResponse)
    .then(suggestions => {
      return suggestions;
    })
    .catch(handleError);
}

export default {
  autocomplete,
  getArticle
};
