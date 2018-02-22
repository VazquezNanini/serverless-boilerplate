import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import App from 'rootContainers/Home';
import { BrowserRouter } from 'react-router-dom';
import * as reducers from 'reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

const reducer = combineReducers(reducers);
const preloadedState = Object.assign({}, window.__REACT_REDUX_PAYLOAD__);
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
  reducer,
  preloadedState,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
