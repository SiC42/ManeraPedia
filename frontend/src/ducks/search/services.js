import axios from "axios";
import config from "config";
import { ArticleNotFoundException } from "helpers/search";

function handleError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (error.response.status === 404) {
      return Promise.reject(
        new ArticleNotFoundException({
          message: error.response.data,
          request: error.request
        })
      );
    }
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
  return Promise.reject(error.toJSON());
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
  const { title, Authorization } = options;
  const headers = {
    Accept: "application/json",
    Authorization
  };
  return axios
    .create({
      headers
    })
    .get(`${config.apiUrl}/article`, {
      params: { title }
    })
    .then(handleResponse)
    .then(suggestions => {
      return suggestions;
    })
    .catch(handleError);
}

function search(options) {
  const { query, Authorization } = options;
  const headers = {
    Accept: "application/json",
    Authorization
  };
  return axios
    .create({
      headers
    })
    .get(`${config.apiUrl}/search`, {
      params: { query }
    })
    .then(handleResponse)
    .then(suggestions => {
      return suggestions;
    })
    .catch(handleError);
}

export default {
  autocomplete,
  getArticle,
  search
};
