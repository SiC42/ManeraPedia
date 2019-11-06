import {
  autocompleteRequest,
  autocompleteFailure,
  autocompleteSuccess,
  clearAutocomplete,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure,
  searchRequest,
  searchSuccess,
  searchFailure
} from "./actions";

const getArticleRequestFromAutocomplete = params =>
  getArticleRequest({ ...params, location: "autocomplete" });

export {
  autocompleteRequest,
  autocompleteFailure,
  autocompleteSuccess,
  clearAutocomplete,
  getArticleRequestFromAutocomplete,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure,
  searchRequest,
  searchSuccess,
  searchFailure
};
