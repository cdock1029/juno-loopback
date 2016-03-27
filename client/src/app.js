import React from 'react'
import { render } from 'react-dom'

import configureStore from './store'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'
import LoginContainer from './containers/LoginContainer'
import EntitySelectionContainer from './containers/EntitySelectionContainer'
import EntitySelector from './containers/EntitySelector'

const store = configureStore()

/* function requireAuth(nextState, replace) {
  if (!Parse.User.current()) {
    replace('/login')
  }
}

function redirectLoggedIn(nextState, replace) {
  if (Parse.User.current()) {
    replace('/')
  }
}*/

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Root}>
        <Route path='/' component={EntitySelectionContainer} >
          <IndexRoute component={EntitySelector} />
          <Route
            path=':propertyId/buildings'
            component={EntitySelector} />
          <Route
            path=':propertyId/buildings/:buildingId/units'
            component={EntitySelector} />
          <Route
            path=':propertyId/buildings/:buildingId/units/:unitId'
            component={EntitySelector} />
        </Route>
        <Route path='/login' component={LoginContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>
  ), document.getElementById('app'))
