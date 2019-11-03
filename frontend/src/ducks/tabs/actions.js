import * as types from "./types";

function add(article, focus) {
  return { type: types.ADD_TAB, payload: { article, focus } };
}

function remove(index) {
  return { type: types.REMOVE_TAB, payload: index };
}

function changeActiveTab(index) {
  return { type: types.CHANGE_ACTIVE_TAB, payload: index };
}

export { add, remove, changeActiveTab };
