'use strict'

import Parse from './parse'

import React from 'react'
import { render } from 'react-dom'

import configureStore from './store'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Root from './components/Root'
import NotFound from './components/NotFound'

import PropertyListContainer from './containers/PropertyListContainer'
import BuildingListContainer from './containers/BuildingListContainer'
import UnitListContainer from './containers/UnitListContainer'
import LoginContainer from './containers/LoginContainer'
import CreateTenantContainer from './containers/CreateTenantContainer'

import EntitySelectionContainer from './containers/EntitySelectionContainer'
import EntitySelector from './containers/EntitySelector'

import {fetchData} from './actions'

const store = configureStore()

function requireAuth(nextState, replace) {
  if (!Parse.User.current()) {
    replace('/login')
  }
}

function redirectLoggedIn(nextState, replace) {
  if (Parse.User.current()) {
    replace('/')
  }
}

render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={Root}>
        <Route path="/" component={EntitySelectionContainer} onEnter={requireAuth}>
          <IndexRoute component={EntitySelector} />
          <Route
            path=":propertyId/buildings"
            component={EntitySelector}/>
          <Route
            path=":propertyId/buildings/:buildingId/units"
            component={EntitySelector} />
        </Route>
        <Route path="/login" component={LoginContainer} onEnter={redirectLoggedIn} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>
  ),document.getElementById('app'))
