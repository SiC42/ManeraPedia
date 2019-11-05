import { ACCESS_TOKEN, addAuthNeededMeta } from "helpers/auth";
import * as types from "./types";

// ============ AUTOCOMPLETE ============
function autocompleteRequest(phrase) {
  return {
    type: types.AUTOCOMPLETE_REQUEST,
    payload: { phrase },
    meta: addAuthNeededMeta(ACCESS_TOKEN)
  };
}
function autocompleteSuccess(suggestions) {
  return { type: types.AUTOCOMPLETE_SUCCESS, payload: suggestions };
}
function autocompleteFailure(error) {
  return { type: types.AUTOCOMPLETE_FAILURE, payload: error };
}

// ============ GET_ARTICLE ============
function getArticleRequest({ title, focus }) {
  return {
    type: types.GET_ARTICLE_REQUEST,
    payload: { title, focus },
    meta: addAuthNeededMeta(ACCESS_TOKEN)
  };
}

function getArticleSuccess() {
  return {
    type: types.GET_ARTICLE_SUCCESS
  };
}
function getArticleFailure(error) {
  return { type: types.GET_ARTICLE_FAILURE, payload: error };
}

// ============ SEARCH ============
function searchRequest({ query, focus }) {
  return {
    type: types.SEARCH_REQUEST,
    payload: { query, focus },
    meta: addAuthNeededMeta(ACCESS_TOKEN)
  };
}
function searchSuccess() {
  return {
    type: types.SEARCH_SUCCESS
  };
}
function searchFailure(error) {
  return { type: types.SEARCH_FAILURE, payload: error };
}

export {
  autocompleteRequest,
  autocompleteFailure,
  autocompleteSuccess,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure,
  searchRequest,
  searchSuccess,
  searchFailure
};
