import { tabActions, tabTypes } from "ducks/tabs";

export default ({ dispatch, getState }) => next => action => {
  const state = getState();
  if (action.type === tabTypes.CHANGE_ACTIVE_TAB) {
    if (action.payload === -1) {
      return next(tabActions.changeActiveTab(state.tabs.list.length - 1));
    }
  }
  if (action.type === tabTypes.REMOVE_TAB) {
    const state = getState();
    console.log(action);
    console.log(state.tabs.list.length - 1);
    if (action.payload === state.tabs.list.length - 1) {
      console.log(action);
      dispatch(tabActions.changeActiveTab(state.tabs.list.length - 2));
      return next(action);
    }
  }
  return next(action);
};
