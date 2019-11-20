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

function clearAutocomplete() {
  return { type: types.CLEAR_AUTOCOMPLETE };
}

// ============ GET_ARTICLE ============
function getArticleRequest({ title, focus, location }) {
  return {
    type: types.GET_ARTICLE_REQUEST,
    payload: { title, focus, location },
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

// ============ GET_REFERENCE ============
function getReferenceRequest(title) {
  return {
    type: types.GET_REFERENCE_REQUEST,
    payload: { title },
    meta: addAuthNeededMeta(ACCESS_TOKEN)
  };
}

function getReferenceSuccess(article) {
  return {
    type: types.GET_REFERENCE_SUCCESS,
    payload: { article, date: Date.now() }
  };
}
function getReferenceFailure(title, error) {
  return {
    type: types.GET_REFERENCE_FAILURE,
    payload: { title, date: Date.now(), error }
  };
}

// ============ SEARCH ============
function searchRequest({ query, focus, tab }) {
  return {
    type: types.SEARCH_REQUEST,
    payload: { query },
    meta: { ...addAuthNeededMeta(ACCESS_TOKEN), tab, focus }
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
  clearAutocomplete,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure,
  getReferenceRequest,
  getReferenceSuccess,
  getReferenceFailure,
  searchRequest,
  searchSuccess,
  searchFailure
};
