import { take, race, call, put } from "redux-saga/effects";
import { delay } from "../../utils";
import {
  MEMBER_GET,
  memberGet,
  MEMBER_CREATE,
  memberCreate
} from "../../actions/member";
import api from "../../api";

export function* watchMemberGet() {
  while (true) {
    try {
      const { query } = yield take(MEMBER_GET.REQUEST);
      const result = yield call(api.member.get, query);
      yield put(memberGet.success(result));
    } catch (error) {
      yield put(memberGet.error(error));
    }
  }
}

export function* watchMemberCreate() {
  while (true) {
    try {
      const { data } = yield take(MEMBER_CREATE.REQUEST);
      const result = yield call(api.member.create, data);
      yield put(memberCreate.success(result));
    } catch (error) {
      yield put(memberCreate.error(error));
    }
  }
}
