import { action, createRequestTypes } from '../utils'

export const ADMIN_LOGIN = createRequestTypes('ADMIN_LOGIN')
export const adminLogin = {
  request: (account, password) => action(ADMIN_LOGIN.REQUEST)({ account, password }),
  success: ({ token, expires_in }) => action(ADMIN_LOGIN.SUCCESS)({ token, expires_in }),
  error: error => action(ADMIN_LOGIN.ERROR)({ error }),
}

export const ADMIN_LOGOUT = 'ADMIN_LOGOUT'
export const adminLogout = action(ADMIN_LOGOUT)

export const ADMIN_INIT = createRequestTypes('ADMIN_INIT')
export const adminInit = {
  request: () => action(ADMIN_INIT.REQUEST)(),
  success: data => action(ADMIN_INIT.SUCCESS)(data),
  error: error => action(ADMIN_INIT.ERROR)({ error }),
}
