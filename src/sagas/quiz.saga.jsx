import { call, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  getQuizzesSuccess,
  quizActionType,
  getQuizzesFAil,
} from "@actions/quiz.action";
import { fetchQuizzes, adminPutQuiz, adminPostQuiz } from "@services/quiz.service";
import { redirectTo } from "@utils/routing";

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

function* putUpdateQuizWorker(action) {
  try {
    const response = yield call(adminPutQuiz, action.payload);
    const { data } = response;
    if (data.success) {
      Swal.fire("Update quiz success");
      yield put(fetchQuizzes());
    }
  } catch (error) {
    // Swal.fire("Quiz update failed .");
  }
}

function* postQuizWorker(action) {
  try {
    const response = yield call(adminPostQuiz, action.payload);
    const { data } = response;
    if (data?.success) {
      Swal.fire("Create quiz success.");
      redirectTo("/admin");
    }
  } catch {
    Swal.fire("Create quiz fail.");
  }
}

export function* getQuizzesWatcher() {
  yield takeEvery(quizActionType.GET_QUIZZES, getQuizzesWorker);
}

export function* putUpdateQuizWatcher() {
  yield takeEvery(quizActionType.PUT_QUIZ, putUpdateQuizWorker);
}

export function* postQuizWatcher() {
  yield takeEvery(quizActionType.POST_QUIZ, postQuizWorker);
}

