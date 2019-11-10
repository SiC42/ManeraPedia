import { tabActions, tabTypes } from "ducks/tabs";

export default ({ dispatch, getState }) => next => action => {
  const state = getState();
  if (action.type === tabTypes.CHANGE_ACTIVE_TAB) {
    if (action.payload === -1) {
      return next(tabActions.changeActiveTab(state.tabs.list.length - 1));
    }
  }
  if (action.type === tabTypes.REMOVE_TAB) {
    if (
      state.tabs.activeTabId === state.tabs.list.length - 1 &&
      state.tabs.list.length > 1
    ) {
      dispatch(tabActions.changeActiveTab(state.tabs.list.length - 2));
      dispatch(tabActions.removeDelayed(action.payload));
      return undefined;
    }
  }
  return next(action);
};
