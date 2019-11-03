import * as types from "./types";

function add(tab) {
  return { type: types.ADD_TAB, payload: tab };
}

function remove(index) {
  return { type: types.REMOVE_TAB, payload: index };
}

function changeActiveTab(index) {
  return { type: types.CHANGE_ACTIVE_TAB, payload: index };
}

export { add, remove, changeActiveTab };
