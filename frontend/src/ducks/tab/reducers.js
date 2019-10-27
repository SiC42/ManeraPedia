import * as types from "./types";

export default function tabs(state = [], action) {
  switch (action.type) {
    case types.ADD_TAB:
      return [...state, action.payload];
    case types.REMOVE_TAB:
      return state.filter((e, i) => i !== action.payload);
    default:
      return state;
  }
}
