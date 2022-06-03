// TODO
/* eslint-disable import/prefer-default-export */
import { call, put, takeEvery } from "redux-saga/effects";
import {
  CheckNameExistSuccess,
  userActionType,
  checkNameExistFail,
} from "@actions/user.action";
import Swal from "sweetalert2";
import { checkNameUserExist } from "@services/user.sessions";

function* checkNameUserWorker(action) {
  try {
    const getSessions = yield call(checkNameUserExist, action.payload);
    const { error, quizId, _id } = getSessions.data;
    const data = { quizId, _id };
    if (error) {
      yield put(checkNameExistFail(error));
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Your name had been exist. Please try different name !!!",
        footer: "<a href=''>Why do I have this issue?</a>",
      });
    } else if (data) {
      yield put(CheckNameExistSuccess(data));
    }
  } catch {
    yield put(checkNameExistFail());
  }
}

export function* checkNameUserWatcher() {
  yield takeEvery(userActionType.CHECK_NAME_USER_EXIST, checkNameUserWorker);
}
