import axios from "axios";
import config from "config";

export const searchService = {
  autocomplete
};

function autocomplete(phrase, accessToken) {
  console.log("search service");
  console.log(accessToken);
  const headers = {
    Accept: "application/json",
    Authorization: accessToken
  };
  return axios
    .create({
      headers: headers
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
  return response.data;
}
