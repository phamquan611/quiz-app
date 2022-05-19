import { call, put, takeEvery } from "redux-saga/effects";
import {
  sessionActionType,
  getListSessionSuccess,
  getListSessionFail,
} from "@actions/session.action";
import { fetchListSession } from "@services/session.service";

function* getListSessionWorker() {
  try {
    const getSessions = yield call(fetchListSession);
    const responseSessions = getSessions?.data;
    if (responseSessions) {
      yield put(getListSessionSuccess(responseSessions));
    }
  } catch {
    yield put(getListSessionFail());
  }
}

export function* getListSessionWatcher() {
  yield takeEvery(sessionActionType.GET_LIST_SESSION, getListSessionWorker);
}
