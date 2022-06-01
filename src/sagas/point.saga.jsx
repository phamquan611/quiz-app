// TODO
/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  getPointQuizzSuccess,
  userActionType,
  getPointQuizzFail,
} from "@actions/user.action";
import { getPointsQuiz } from "@services/user.sessions";

function* getPointsWorker(action) {
  try {
    const getSessions = yield call(getPointsQuiz, action.payload);
    const points = getSessions.data;
    if (points) {
      yield put(getPointQuizzSuccess(points));
    } else {
      yield put(getPointQuizzFail());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href=''>Why do I have this issue?</a>",
      });
    }
  } catch {
    yield put(getPointQuizzFail());
  }
}

export function* getSessionWatcher() {
  yield takeEvery(userActionType.GET_POINT_QUIZZ, getPointsWorker);
}
