import { browserHistory } from 'react-router'

const ADMINPAGE = new RegExp('^/admin/.+$')
const isAdminPage = pathname => ADMINPAGE.test(pathname)

const adminAuth = store => next => (action) => {
  const { type, payload } = action
  if (type === '@@router/LOCATION_CHANGE' &&
    isAdminPage(payload.pathname)) {
    const { admin } = store.getState().reducers
    if (admin.logined !== true) {
      const newPayload = Object.assign({}, payload, {
        pathname: '/admin',
      })
      const newAction = Object.assign({}, action, { payload: newPayload })
      return next(newAction)
    }
  }
  if (type === 'ADMIN_LOGOUT') {
    browserHistory.push('/admin')
  }
  return next(action)
}

export default adminAuth
