import { call, put, takeEvery } from "redux-saga/effects";
import { NotLoggedInException } from "helpers/auth";
import { authOperations } from "ducks/auth";
import { changeActiveTab } from "ducks/tabs/operations";
import * as searchOperations from "./operations";
import * as types from "./types";
import searchService from "./services";

function* autocompleteTitle(action) {
  try {
    if (!action.payload.Authorization) {
      throw new NotLoggedInException({ actionType: action.type });
    }
    let suggestions = [];
    if (action.payload.phrase !== "") {
      suggestions = yield call(
        searchService.autocomplete,
        action.payload.phrase,
        action.payload.Authorization
      );
    }
    yield put(searchOperations.autocompleteSuccess(suggestions));
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authOperations.loginNeeded(e.message));
    }
    yield put(searchOperations.autocompleteFailure(e));
  }
}

function* getArticle(action) {
  try {
    if (!action.payload.Authorization) {
      throw new NotLoggedInException();
    }
    const article = yield call(searchService.getArticle, {
      title: action.payload.title,
      Authorization: action.payload.Authorization
    });
    yield put(searchOperations.getArticleSuccess(article));
    if (action.payload.focus) {
      yield put(changeActiveTab(-1));
    }
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authOperations.loginNeeded(e));
    }
    yield put(searchOperations.getArticleFailure(e.message));
  }
}

export default function* searchSaga() {
  yield takeEvery(types.AUTOCOMPLETE_REQUEST, autocompleteTitle);
  yield takeEvery(types.GET_ARTICLE_REQUEST, getArticle);
}
