import { authOperations } from "ducks/auth";
import { changeActiveTab } from "ducks/tabs/operations";
import { NotLoggedInException } from "helpers/auth";
import { ArticleNotFoundException } from "helpers/search";
import { call, put, takeEvery } from "redux-saga/effects";
import * as searchOperations from "./operations";
import searchService from "./services";
import * as types from "./types";

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
    if (e instanceof ArticleNotFoundException) {
      yield put(searchOperations.searchRequest(action.payload.title));
    }
    yield put(searchOperations.getArticleFailure(e.message));
  }
}

export default function* searchSaga() {
  yield takeEvery(types.AUTOCOMPLETE_REQUEST, autocompleteTitle);
  yield takeEvery(types.GET_ARTICLE_REQUEST, getArticle);
}
