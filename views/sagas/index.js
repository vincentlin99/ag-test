import { fork } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
import { watchAdminInit, watchAdminAuth } from "./admin/auth";
import { watchMemberGet, watchMemberCreate } from "./admin/member";

const sagaMiddleware = createSagaMiddleware();

function* rootSagas() {
  yield [
    fork(watchAdminInit),
    fork(watchAdminAuth),
    fork(watchMemberGet),
    fork(watchMemberCreate)
  ];
}

const run = () => {
  sagaMiddleware.run(rootSagas);
};

export default {
  sagaMiddleware,
  run
};
