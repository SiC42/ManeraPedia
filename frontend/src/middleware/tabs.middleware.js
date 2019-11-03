import { tabOperations, tabTypes } from "ducks/tabs";

export default ({ getState }) => next => action => {
  const state = getState();
  console.log(action);
  if (action.type === tabTypes.CHANGE_ACTIVE_TAB) {
    if (action.payload === -1) {
      return next(tabOperations.changeActiveTab(state.tabs.list.length - 1));
    }
  }
  return next(action);
};
