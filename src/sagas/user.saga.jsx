/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllDataSessionSuccess,
  userActionType,
  getAllDataSessionFAil,
} from "@actions/user.action";
import { fetchSessions } from "@services/user.sessions";

function* getSessionsWorker() {
  try {
    const getSessions = yield call(fetchSessions);
    const sessions = getSessions?.data;
    if (sessions?.error) {
      yield put(getAllDataSessionFAil());
    } else {
      yield put(getAllDataSessionSuccess(sessions));
    }
  } catch {
    yield put(getAllDataSessionFAil());
  }
}

export function* getSessionWatcher() {
  yield takeEvery(userActionType.GET_DATA_SESSIONS, getSessionsWorker);
}
