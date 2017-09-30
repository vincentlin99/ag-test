import { ADMIN_INIT, ADMIN_LOGIN, ADMIN_LOGOUT } from "../actions/auth";

const initSate = {
  logined: false,
  status: "NORMAL"
};

export default (state = initSate, action) => {
  switch (action.type) {
    case ADMIN_LOGIN.REQUEST:
      return {
        ...state,
        logined: false,
        status: "PENDING"
      };
    case ADMIN_LOGIN.SUCCESS:
      return {
        ...state,
        logined: true,
        status: "NORMAL"
      };
    case ADMIN_LOGIN.ERROR:
      return {
        ...state,
        logined: false,
        status: "ERROR",
        error: action.error
      };
    case ADMIN_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        logined: false,
        status: "NORMAL"
      };
    case ADMIN_INIT.REQUEST:
      return {
        ...state,
        logined: false,
        status: "PENDING"
      };
    case ADMIN_INIT.SUCCESS:
      return {
        ...state,
        logined: true,
        name: action.name,
        status: "NORMAL"
      };
    case ADMIN_INIT.ERROR:
      return {
        ...state,
        logined: false,
        status: "NORMAL"
      };
    default:
      return state;
  }
};
