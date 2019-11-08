import * as types from "./types";

const initialState = {
  list: [],
  activeTabId: 0
};
export default function tabs(state = initialState, action) {
  switch (action.type) {
    case types.ADD_TAB:
      return { ...state, list: [...state.list, action.payload.tab] };
    case types.REMOVE_TAB: {
      const list = state.list.filter((_, i) => i !== action.payload);
      return { ...state, list };
    }
    case types.CHANGE_ACTIVE_TAB:
      return { ...state, activeTabId: action.payload };
    default:
      return state;
  }
}
