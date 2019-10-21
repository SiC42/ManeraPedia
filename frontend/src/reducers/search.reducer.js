import { AUTOCOMPLETE_SUCCESS, AUTOCOMPLETE_FAILURE } from "../constants";

export function search(state = {}, action) {
  switch (action.type) {
    case AUTOCOMPLETE_SUCCESS:
      return {
        suggestions: action.payload.suggestions
      };
    case AUTOCOMPLETE_FAILURE:
      return {};
    default:
      return state;
  }
}
