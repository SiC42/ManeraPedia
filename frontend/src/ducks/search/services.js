import axios from "axios";
import config from "config";

function handleError(error) {
  if (error.response) {
    console.log(error.toJSON());
    return Promise.reject(error.toJSON());
  }
  return error;
}

function handleResponse(response) {
  return response.data;
}

function autocomplete(phrase, accessToken) {
  console.log("search service");
  console.log(accessToken);
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

export default {
  autocomplete
};
