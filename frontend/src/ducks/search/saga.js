import { call, put, takeEvery } from "redux-saga/effects";
import { NotLoggedInException } from "helpers/auth";
import { authOperations } from "ducks/auth";
import * as searchActions from "./actions";
import * as types from "./types";
import searchService from "./services";

function* autocompleteTitle(action) {
  try {
    if (!action.payload.Authorization) {
      throw new NotLoggedInException();
    }
    const suggestions = yield call(
      searchService.autocomplete,
      action.payload.phrase,
      action.payload.Authorization
    );
    yield put(searchActions.autocompleteSuccess(suggestions));
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authOperations.loginNeeded(e));
    }
    yield put(searchActions.autocompleteFailure(e));
  }
}

export default function* searchSaga() {
  yield takeEvery(types.AUTOCOMPLETE_REQUEST, autocompleteTitle);
}
