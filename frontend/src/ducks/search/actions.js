import * as types from "./types";

export { autocompleteRequest, autocompleteFailure, autocompleteSuccess };

function autocompleteRequest(phrase) {
  return { type: types.AUTOCOMPLETE_REQUEST, payload: { phrase } };
}
function autocompleteSuccess(suggestions) {
  return { type: types.AUTOCOMPLETE_SUCCESS, payload: suggestions };
}
function autocompleteFailure(error) {
  return { type: types.AUTOCOMPLETE_FAILURE, payload: error };
}
