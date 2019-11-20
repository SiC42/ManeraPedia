import * as types from "./types";

function add(tab, props = {}) {
  const { focus, id } = props;
  return { type: types.ADD_TAB, payload: { tab, focus, id } };
}

function addLoad(id, title) {
  return {
    type: types.ADD_TAB,
    payload: { tab: { type: "search/loading", id, title } }
  };
}

function changeTabContent(id, tab) {
  return { type: types.CHANGE_TAB_CONTENT, payload: { tab, id } };
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

export {
  add,
  addLoad,
  changeTabContent,
  changeActiveTab,
  remove,
  removeDelayed
};
