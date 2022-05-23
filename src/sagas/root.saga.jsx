/* eslint-disable import/prefer-default-export */
import { all } from "redux-saga/effects";
import * as sessionsSaga from "./user.saga";

export function* RootSaga() {
  yield all([
    sessionsSaga.getSessionWatcher()
  ]);
}
