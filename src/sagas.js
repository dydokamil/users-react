import { delay } from "redux-saga";
import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";

export function* watcherFetchUser(payload) {
  yield takeEvery("FETCH_USER_REQUEST", workerFetchUser);
}

export function* workerFetchUser(payload) {
  try {
    const user = yield call(fetchUser, payload);
    yield put({ type: "API_CALL_SUCCESS", user: user.data.data });
  } catch (error) {
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

export function fetchUser(payload) {
  return axios.get(`https://reqres.in/api/users/${payload.payload.id}`);
}

// Remove user //
export function* watcherRemoveUser(payload) {
  yield takeEvery("REMOVE_USER_REQUEST", workerRemoveUser);
}

export function* workerRemoveUser({ payload }) {
  try {
    yield put({ type: "REMOVE_USER", user: payload.id });
  } catch (error) {
    console.log("HANDLE THIS ERROR PLEASE.");
  }
}

export default function* rootSaga() {
  yield all([watcherFetchUser(), watcherRemoveUser()]);
}
