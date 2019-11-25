import { tabsActions, tabsTypes } from "ducks/tabs";

export default ({ dispatch, getState }) => next => action => {
  const state = getState();
  if (action.type === tabsTypes.CHANGE_ACTIVE_TAB) {
    if (action.payload === -1) {
      return next(tabsActions.changeActiveTab(state.tabs.list.length - 1));
    }
  }
  if (action.type === tabsTypes.REMOVE_TAB) {
    if (
      state.tabs.activeTabId === state.tabs.list.length - 1 &&
      state.tabs.list.length > 1
    ) {
      dispatch(tabsActions.changeActiveTab(state.tabs.list.length - 2));
      dispatch(tabsActions.removeDelayed(action.payload));
      return undefined;
    }
  }
  return next(action);
};
