import { call, put, takeEvery } from "redux-saga/effects";
import Swal from "sweetalert2";
import {
  sessionActionType,
  getListSessionSuccess,
  getListSessionFail,
  getListSession,
} from "@actions/session.action";
import { fetchListSession, postSession } from "@services/session.service";

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

function* postNewSessionWorker(action) {
  try {
    const responsePostSession = yield call(postSession, action.payload);
    if (
      responsePostSession.status === 200
      || responsePostSession.data?.success
    ) {
      Swal.fire({
        title: "Add session successfully",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      yield put(getListSession());
    } else {
      Swal.fire("Create session fail .");
    }
  } catch {
    Swal.fire("Create session fail .");
  }
}

export function* getListSessionWatcher() {
  yield takeEvery(sessionActionType.GET_LIST_SESSION, getListSessionWorker);
}

export function* postNewSessionWatcher() {
  yield takeEvery(sessionActionType.POST_SESSION, postNewSessionWorker);
}
