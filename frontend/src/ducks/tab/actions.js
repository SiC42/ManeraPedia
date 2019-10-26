import * as types from "./types";

export { add, remove };

function add(tab) {
  return { type: types.ADD_TAB, payload: tab };
}

function remove(index) {
  return { type: types.REMOVE_TAB, payload: index };
}