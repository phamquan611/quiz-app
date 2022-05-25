import { all } from "redux-saga/effects";
import * as adminSaga from "./admin.saga";
import * as sessionSaga from "./session.saga";
import * as quizzesSaga from "./quiz.saga";

export function* RootSaga() {
  yield all([
    adminSaga.adminSignInWatcher(),
    sessionSaga.getListSessionWatcher(),
    quizzesSaga.getQuizzesWatcher(),
    quizzesSaga.putUpdateQuizWatcher(),
    quizzesSaga.postQuizWatcher(),
    sessionSaga.postNewSessionWatcher(),
  ]);
}
