import { all } from "redux-saga/effects";
import * as adminSaga from "./admin.saga";
import * as sessionSaga from "./session.saga";
import * as quizzesSaga from "./quiz.saga";
import * as userSaga from "./user.saga";
import * as pointSaga from "./point.saga";
import * as nameExistSaga from "./checkNameExist.saga";
import * as quizDataSaga from "./quizData.saga";


export function* RootSaga() {
  yield all([
    adminSaga.adminSignInWatcher(),
    sessionSaga.getListSessionWatcher(),
    quizzesSaga.getQuizzesWatcher(),
    quizzesSaga.putUpdateQuizWatcher(),
    quizzesSaga.postQuizWatcher(),
    sessionSaga.postNewSessionWatcher(),
    userSaga.getSessionWatcher(),
    pointSaga.getSessionWatcher(),
    nameExistSaga.checkNameUserWatcher(),
    quizDataSaga.getQuizDataWatcher(),
  ]);
}
