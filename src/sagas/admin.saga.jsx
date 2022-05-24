import { call, put, takeEvery } from "redux-saga/effects";
import {
  adminActionType,
  adminSignInSuccess,
  adminSignInFail,
} from "@actions/admin.action";
import { postAdminSignIn } from "@services/admin.service";

function* adminSignInWorker(action) {
  try {
    const response = yield call(postAdminSignIn, action.payload);
    const { error, accessToken } = response.data;
    if (error) {
      yield put(adminSignInFail());
    } else if (accessToken) {
      yield put(adminSignInSuccess(accessToken));
    }
  } catch {
    yield put(adminSignInFail());
  }
}

// eslint-disable-next-line import/prefer-default-export
export function* adminSignInWatcher() {
  yield takeEvery(adminActionType.ADMIN_REQUIRE_SIGN_IN, adminSignInWorker);
}
