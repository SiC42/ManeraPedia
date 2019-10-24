import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_SUCCESS,
  AUTOCOMPLETE_FAILURE
} from "../constants";

export const searchActions = {
  autocompleteRequest,
  autocompleteFailure,
  autocompleteSuccess
};

function autocompleteRequest(phrase) {
  return { type: AUTOCOMPLETE_REQUEST, payload: { phrase } };
}
function autocompleteSuccess(suggestions) {
  return { type: AUTOCOMPLETE_SUCCESS, payload: suggestions };
}
function autocompleteFailure(error) {
  return { type: AUTOCOMPLETE_FAILURE, payload: error };
}
