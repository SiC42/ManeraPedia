import { ADD_TAB, REMOVE_TAB } from "../constants";

export default function tabs(state = [], action) {
  switch (action.type) {
    case ADD_TAB:
      return [...state, action.payload];
    case REMOVE_TAB:
      console.log(action.index);
      return state.filter((e, i) => i !== action.payload);
    default:
      return state;
  }
}
