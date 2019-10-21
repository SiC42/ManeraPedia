import {
  AUTOCOMPLETE_REQUEST,
  AUTOCOMPLETE_SUCCESS,
  AUTOCOMPLETE_FAILURE
} from "../constants";
import { searchService } from "../services";

export const searchActions = {
  autocomplete
};

function autocomplete(phrase) {
  return dispatch => {
    dispatch(request(phrase));
    searchService.autocomplete(phrase).then(
      suggestions => {
        dispatch(success(suggestions));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request(phrase) {
    return { type: AUTOCOMPLETE_REQUEST, payload: phrase };
  }
  function success(suggestions) {
    return { type: AUTOCOMPLETE_SUCCESS, payload: suggestions };
  }
  function failure(error) {
    return { type: AUTOCOMPLETE_FAILURE, payload: error };
  }
}
