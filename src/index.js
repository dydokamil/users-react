import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import logger from "redux-logger";

import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import rootSaga from "./sagas";
import rootReducer from "./reducers";
import Counter from "./Counter";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Counter />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
