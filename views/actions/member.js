import { action, createRequestTypes } from "../utils";

export const MEMBER_GET = createRequestTypes("MEMBER_GET");
export const memberGet = {
  request: q => action(MEMBER_GET.REQUEST)(q),
  success: data => action(MEMBER_GET.SUCCESS)(data),
  error: error => action(MEMBER_GET.ERROR)({ error })
};

export const MEMBER_CREATE = createRequestTypes("MEMBER_CREATE");
export const memberCreate = {
  request: data => action(MEMBER_CREATE.REQUEST)(data),
  success: data => action(MEMBER_CREATE.SUCCESS)(data),
  error: error => action(MEMBER_CREATE.ERROR)({ error })
};
