import {ADD_TAB, REMOVE_TAB} from "../constants"

export const tabActions = {
  add,
  remove
}

function add(tab) {
  return { type: "TERST", tab }
}

function remove(index) {
  return { type: REMOVE_TAB, index }
}