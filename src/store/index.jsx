import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";
import { RootSaga } from "@sagas/root.saga";
import rootReducer from "@reducers/root.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const saga = createSagaMiddleware();
const middlewares = [saga, logger];
const middlewareEnhancer = composeEnhancers(applyMiddleware(...middlewares));

const configureStore = () => {
  const store = createStore(rootReducer, middlewareEnhancer);
  saga.run(RootSaga);
  return store;
};

export default configureStore;
