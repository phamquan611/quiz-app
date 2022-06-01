// TODO
/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  getDataQuizIDSuccess,
  userActionType,
  getDataQuizIDFail,
} from "@actions/user.action";
import { getQuizData } from "@services/user.sessions";

function* getQuizDataWorker(action) {
  try {
    const getSessions = yield call(getQuizData, action.payload);
    const questions = getSessions.data;
    if (questions) {
      yield put(getDataQuizIDSuccess(questions));
    } else {
      yield put(getDataQuizIDFail());
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: "<a href=''>Why do I have this issue?</a>",
      });
    }
  } catch {
    yield put(getDataQuizIDFail());
  }
}

export function* getQuizDataWatcher() {
  yield takeEvery(userActionType.GET_QUIZID_DATA, getQuizDataWorker);
}
