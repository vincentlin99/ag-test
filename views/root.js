import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import routes from './routes'
import reducers from './reducers'
import sagas from './sagas'
import adminAuth from './middlewares/admin'

const rootRoute = {
  childRoutes: [routes],
}

const initialState = {
  reducers: {
    admin: {
      logined: false,
      status: 'NORMAL',
    },
  },
}

const middlewares = [sagas.sagaMiddleware, adminAuth]

const store = createStore(
  combineReducers({
    reducers,
    routing: routerReducer,
  }),
  initialState,
  applyMiddleware(...middlewares),
)

sagas.run()

const history = syncHistoryWithStore(browserHistory, store)

const Root = () => (
  <Provider store={store}>
    <Router history={history} routes={rootRoute} />
  </Provider>
)

export default Root
