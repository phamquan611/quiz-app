// TODO
/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import {
  CheckNameSuccess,
  userActionType,
  checkNameFail,
} from "@actions/user.action";
import { checkNameUser } from "@services/user.sessions";

function* checkNameUserWorker(action) {
  try {
    const getSessions = yield call(checkNameUser, action.payload);
    const id = getSessions.data;
    if (id) {
      yield put(CheckNameSuccess(id));
    } else {
      yield put(checkNameFail());
    }
  } catch {
    yield put(checkNameFail());
  }
}

export function* checkNameUserWatcher() {
  yield takeEvery(userActionType.CHECK_NAME_USER, checkNameUserWorker);
}
