import { ACCESS_TOKEN, addAuthNeededMeta } from "helpers/auth";
import * as types from "./types";

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

function getArticleRequest({ title, tryExact, focus }) {
  return {
    type: types.GET_ARTICLE_REQUEST,
    payload: { title, tryExact, focus },
    meta: addAuthNeededMeta(ACCESS_TOKEN)
  };
}

function getArticleSuccess(article, focus) {
  return {
    type: types.GET_ARTICLE_SUCCESS,
    payload: { article, focus }
  };
}
function getArticleFailure(error) {
  return { type: types.GET_ARTICLE_FAILURE, payload: error };
}

export {
  autocompleteRequest,
  autocompleteFailure,
  autocompleteSuccess,
  getArticleRequest,
  getArticleSuccess,
  getArticleFailure
};
