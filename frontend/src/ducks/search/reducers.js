import * as types from "./types";

export default function search(state = {}, action) {
  switch (action.type) {
    case types.AUTOCOMPLETE_SUCCESS:
      return {
        suggestions: action.payload.suggestions
      };
    case types.AUTOCOMPLETE_FAILURE:
      return {};
    case types.CLEAR_AUTOCOMPLETE:
      return {};
    default:
      return state;
  }
}
