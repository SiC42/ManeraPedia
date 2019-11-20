import { authActions } from "ducks/auth";
import { changeActiveTab, add, addLoad, change } from "ducks/tabs/actions";
import { NotLoggedInException } from "helpers/auth";
import { ArticleNotFoundException } from "helpers/search";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import * as searchActions from "./actions";
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
    yield put(searchActions.autocompleteSuccess(suggestions));
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authActions.loginNeeded(e.message));
    }
    yield put(searchActions.autocompleteFailure(e));
  }
}

function* addTab(title) {
  const id = `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  yield put(addLoad(id, title));
  return id;
}

function* getArticle(action) {
  let id;
  try {
    if (!action.meta.tab) {
      id = yield addTab(action.payload.title);
    } else {
      id = action.meta.tab;
    }
    if (action.payload.focus) {
      yield put(changeActiveTab(-1));
    }
    if (!action.payload.Authorization) {
      throw new NotLoggedInException();
    }
    const article = yield call(searchService.getArticle, {
      title: action.payload.title,
      Authorization: action.payload.Authorization
    });
    yield put(searchActions.getArticleSuccess());
    yield put(change(id, article));
    if (action.payload.location === "autosuggest") {
      yield put(searchActions.clearAutocomplete());
    }
  } catch (e) {
    yield put(searchActions.getArticleFailure(e.message));
    if (e instanceof NotLoggedInException) {
      yield put(authActions.loginNeeded(e));
    }
    if (e instanceof ArticleNotFoundException) {
      yield put(
        searchActions.searchRequest({
          query: action.payload.title,
          tab: id
        })
      );
    }
  }
}

function* getReference(action) {
  try {
    if (!action.payload.Authorization) {
      throw new NotLoggedInException();
    }
    const article = yield call(searchService.getArticle, {
      title: action.payload.title,
      Authorization: action.payload.Authorization
    });
    yield put(searchActions.getReferenceSuccess(article));
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authActions.loginNeeded(e));
      yield put(
        searchActions.getReferenceFailure(action.payload.title, e.message)
      );
    } else {
      yield put(
        searchActions.getReferenceFailure(action.payload.title, e.message)
      );
    }
  }
}

function* searchRequest(action) {
  let id;
  try {
    if (!action.meta.tab) {
      id = addTab(action.payload.title);
    } else {
      id = action.meta.tab;
    }
    if (!action.payload.Authorization) {
      throw new NotLoggedInException();
    }
    const results = yield call(searchService.search, {
      query: action.payload.query,
      Authorization: action.payload.Authorization
    });
    results.type = "search/results";
    results.title = `Search results for '${action.payload.query}'`;
    results.id = results.title;
    yield put(searchActions.searchSuccess());
    yield put(change(id, results));
  } catch (e) {
    if (e instanceof NotLoggedInException) {
      yield put(authActions.loginNeeded(e));
      yield put(searchActions.searchFailure(e.message));
    }
  }
}

export default function* searchSaga() {
  yield takeLatest(types.AUTOCOMPLETE_REQUEST, autocompleteTitle);
  yield takeEvery(types.GET_ARTICLE_REQUEST, getArticle);
  yield takeEvery(types.SEARCH_REQUEST, searchRequest);
  yield takeLatest(types.GET_REFERENCE_REQUEST, getReference);
}
