import { take, race, call, put } from "redux-saga/effects";
import {
  ADMIN_INIT,
  ADMIN_LOGIN,
  adminLogin,
  adminInit
} from "../../actions/auth";
import api from "../../api";

function* authorize(credentials) {
  try {
    const result = yield call(api.auth.adminLogin, credentials);
    if (result.token) {
      localStorage.clear();
      localStorage.setItem("ADMIN_TOKEN", result.token);
      localStorage.setItem("n", window.btoa(credentials.account));
      localStorage.setItem("p", window.btoa(credentials.password));
    }
    yield put(adminLogin.success(result));
    return result;
  } catch (error) {
    yield put(adminLogin.error(error));
    return error;
  }
}

export function* watchAdminAuth() {
  while (true) {
    const { account, password } = yield take(ADMIN_LOGIN.REQUEST);
    yield call(authorize, { account, password });
  }
}

export function* watchAdminInit() {
  while (true) {
    try {
      yield take(ADMIN_INIT.REQUEST);
      let admin = yield call(api.auth.auth);
      if (admin === "jwt expired") {
        const credentials = {
          account: window.atob(localStorage.getItem("n")),
          password: window.atob(localStorage.getItem("p"))
        };
        admin = yield call(authorize, credentials);
      }
      yield put(adminInit.success(admin));
    } catch (error) {
      yield put(adminInit.error(error));
    }
  }
}
