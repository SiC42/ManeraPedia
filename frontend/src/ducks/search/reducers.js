import * as types from "./types";

const INITAL_STATE = { suggestions: [], references: {} };
export default function search(state = INITAL_STATE, action) {
  switch (action.type) {
    case types.AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        suggestions: action.payload.suggestions
      };
    case types.AUTOCOMPLETE_FAILURE:
      return { ...state, suggestions: [] };
    case types.CLEAR_AUTOCOMPLETE:
      return { ...state, suggestions: [] };
    case types.GET_REFERENCE_SUCCESS: {
      const { article, date } = action.payload;
      const references = { ...state.references };
      references[article.title] = { article, date };
      return { ...state, references };
    }
    case types.GET_REFERENCE_FAILURE: {
      const { title, date } = action.payload;
      const references = { ...state.references };
      references[title] = { article: null, date };
      return { ...state, references };
    }
    default:
      return state;
  }
}
