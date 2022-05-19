import { call, put, takeEvery } from "redux-saga/effects";
import {
  getQuizzesSuccess,
  quizActionType,
  getQuizzesFAil,
} from "@actions/quiz.action";
import { fetchQuizzes } from "@services/quiz.service";

function* getQuizzesWorker() {
  try {
    const getQuizzes = yield call(fetchQuizzes);
    const quizzes = getQuizzes?.data;
    if (quizzes?.error) {
      yield put(getQuizzesFAil());
    } else {
      yield put(getQuizzesSuccess(quizzes));
    }
  } catch {
    yield put(getQuizzesFAil());
  }
}

export function* getQuizzesWatcher() {
  yield takeEvery(quizActionType.GET_QUIZZES, getQuizzesWorker);
}
