import React from 'react'
import { render } from 'react-dom'
import Parse from 'parse'

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import { routeReducer, syncHistory } from 'redux-simple-router'

import { juno } from './reducers'
import createHistory from 'history/lib/createHashHistory'

import Root from './components/Root'
import PropertyListContainer from './containers/PropertyListContainer'
import LoginContainer from './containers/LoginContainer'

Parse.initialize(process.env.JUNO_APP_ID, process.env.JUNO_JS_KEY)

const history = createHistory()
const historyMiddleware = syncHistory(history)
const reducer = combineReducers({
  juno,
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
      </Route>
    </Router>
  </Provider>
  ),document.getElementById('app'))
