import axios from "axios";
import config from "config";
import { authHeader } from "helpers";

export const searchService = {
  autocomplete
};

function autocomplete(phrase) {
  return axios
    .create({
      headers: authHeader()
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
