import { MEMBER_GET, MEMBER_CREATE } from "../actions/member";

export default (state = { status: "normal" }, action) => {
  switch (action.type) {
    case MEMBER_GET.REQUEST:
      return {
        ...state,
        status: "pending",
        created: false
      };
    case MEMBER_GET.SUCCESS:
      return {
        ...state,
        status: "normal",
        data: action.data
      };
    case MEMBER_GET.ERROR:
      return {
        ...state,
        error: action.error,
        status: "error"
      };
    case MEMBER_CREATE.REQUEST:
      return {
        ...state,
        status: "pending",
        created: false
      };
    case MEMBER_CREATE.SUCCESS:
      return {
        ...state,
        status: "normal",
        result: "ok",
        created: true
      };
    case MEMBER_CREATE.ERROR:
      return {
        ...state,
        error: action.error,
        status: "error"
      };
    default:
      return state;
  }
};
