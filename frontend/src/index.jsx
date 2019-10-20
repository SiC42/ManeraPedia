import React from "react";
import { render } from "react-dom";
import "./index.css";
import Wiki from "components/wiki";
import * as serviceWorker from "serviceWorker";
import {  } from "redux";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, combineReducers, compose } from "redux";
import * as reducers from "reducers";
import thunkMiddleware from 'redux-thunk';

console.log(reducers);
const rootReducer = combineReducers(reducers);

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware
    )));

render(
  <Provider store={store}>
    <Wiki />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
