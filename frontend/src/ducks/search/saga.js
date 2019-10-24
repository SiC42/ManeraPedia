import { call, put, takeEvery } from "redux-saga/effects";
import * as searchActions from "./actions";
import * as types from "./types";
import { searchService } from "services";

function* autocompleteTitle(action) {
  try {
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

export default function* searchSaga() {
  yield takeEvery(types.AUTOCOMPLETE_REQUEST, autocompleteTitle);
}
