import * as types from "./types";

function add(tab, focus) {
  return { type: types.ADD_TAB, payload: { tab, focus } };
}

function changeActiveTab(index) {
  return { type: types.CHANGE_ACTIVE_TAB, payload: index };
}

function remove(index) {
  return { type: types.REMOVE_TAB, payload: index };
}

function removeDelayed(index) {
  return { type: types.REMOVE_TAB_DELAYED, payload: index };
}

export { add, changeActiveTab, remove, removeDelayed };
