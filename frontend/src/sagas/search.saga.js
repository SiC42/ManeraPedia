import { call, put, takeEvery } from "redux-saga/effects";
import { searchActions } from "../actions/search.actions";
import { AUTOCOMPLETE_REQUEST } from "../constants";
import { searchService } from "../services";

function* autocompleteTitle(action) {
  try {
    console.log("saga");
    console.log(action);
    const suggestions = yield call(
      searchService.autocomplete,
      action.payload.phrase,
      action.payload.Authorization
    );
    yield put(searchActions.autocompleteSuccess(suggestions));
  } catch (e) {
    yield put(searchActions.autocompleteFailure(e));
  }
}

export function* searchSaga() {
  yield takeEvery(AUTOCOMPLETE_REQUEST, autocompleteTitle);
}
