import React from 'react'
import { render } from 'react-dom'
import Parse from 'parse'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { routeReducer, syncHistory } from 'react-router-redux'
import { reducer as form } from 'redux-form'

import { juno } from './reducers'
import createHistory from 'history/lib/createHashHistory'

import Root from './components/Root'
import PropertyListContainer from './containers/PropertyListContainer'
import UnitListContainer from './containers/UnitListContainer'
import LoginContainer from './containers/LoginContainer'
import CreateTenantContainer from './containers/CreateTenantContainer'

import {
  toUpperCase,
  toLowerCase,
  normalizePhone
} from './validation'

Parse.initialize(process.env.PARSE_APP_ID, process.env.PARSE_JS_KEY)

const history = createHistory()
const historyMiddleware = syncHistory(history)
const reducer = combineReducers({
  juno,
  form: form.normalize({
    createTenant: {
      firstName: toUpperCase,
      lastName: toUpperCase,
      middleName: toUpperCase,
      email: toLowerCase,
      phone: normalizePhone
    }
  }),
  routing: routeReducer
})
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  historyMiddleware,
  createLogger()
)(createStore)

const store = ((initialState) => {
  return createStoreWithMiddleware(reducer, initialState)
})()

historyMiddleware.listenForReplays(store)

function requireAuth(nextState, replace) {
  if (!Parse.User.current()) {
    replace({
      nextPathname: nextState.location.pathname,
    }, '/login')
  }
}

render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Root}>
        <IndexRoute component={PropertyListContainer} onEnter={requireAuth} />
        <Route path="login" component={LoginContainer} />
        <Route path="units/:id" component={UnitListContainer} onEnter={requireAuth} />
        <Route path="new-tenant" component={CreateTenantContainer} onEnter={requireAuth} />
      </Route>
    </Router>
  </Provider>
  ),document.getElementById('app'))
