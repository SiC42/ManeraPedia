import {ADD_TAB, REMOVE_TAB} from "../constants"

export const tabActions = {
  add,
  remove
}

function add(tab) {
  return { type: ADD_TAB, tab }
}

function remove(index) {
  return { type: REMOVE_TAB, index }
}