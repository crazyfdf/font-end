import { SIGNUP, SignUpAction, signUpFail, signUpSuccess } from "../actions/auth.actions";
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { API } from "../../config";

function* hanleSignUp(action: SignUpAction) {
  try {
    yield axios.post(`${API}/signup`, action.payload);
    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFail(error.response.data.error));
  }
}

export default function* authSaga() {
  yield takeEvery(SIGNUP, hanleSignUp);
}
