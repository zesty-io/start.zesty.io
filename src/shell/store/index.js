import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { user } from './user'
import { auth } from './auth'
import { settings } from './settings'
import { notifications } from './notifications'
import { confirm } from './confirm'
import { systemRoles } from './systemRoles'
import { ecosystems } from './ecosystems'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const loggerMiddleware = createLogger({
  collapsed: true
})

const appReducer = combineReducers({
  ecosystems,
  user,
  auth,
  settings,
  confirm,
  notifications,
  systemRoles
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }
  return appReducer(state, action)
}

export const store = createStore(
  rootReducer,
  composeEnhancers(
    CONFIG.ENV === 'production'
      ? applyMiddleware(thunkMiddleware)
      : applyMiddleware(thunkMiddleware, loggerMiddleware)
  )
)
