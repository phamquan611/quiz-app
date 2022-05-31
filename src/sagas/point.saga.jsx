// TODO
/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getPointQuizzSuccess,
  userActionType,
  getPointQuizzFAil,
} from "@actions/user.action";
import { getPointsQuiz } from "@services/user.sessions";

function* getPointsWorker(action) {
  try {
    const getSessions = yield call(getPointsQuiz, action.payload);
    const points = getSessions.data;
    if (points) {
      yield put(getPointQuizzSuccess(points));
    } else {
      yield put(getPointQuizzFAil());
    }
  } catch {
    yield put(getPointQuizzFAil());
  }
}

export function* getSessionWatcher() {
  yield takeEvery(userActionType.GET_POINT_QUIZZ, getPointsWorker);
}
