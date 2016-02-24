'use strict'

import Parse from './parse'

import React from 'react'
import { render } from 'react-dom'

import configureStore from './store'

import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './components/Root'
import PropertyListContainer from './containers/PropertyListContainer'
import BuildingListContainer from './containers/BuildingListContainer'
import UnitListContainer from './containers/UnitListContainer'
import LoginContainer from './containers/LoginContainer'
import CreateTenantContainer from './containers/CreateTenantContainer'

import EntitySelectionContainer from './containers/EntitySelectionContainer'
import EntitySelector from './containers/EntitySelector'

import Tester from './containers/Tester'

//import {fetchProperties} from './actions'
import {fetchData} from './actions'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

function requireAuth(nextState, replace) {
  if (!Parse.User.current()) {
    replace('/login')
  }
}

const NotFound = React.createClass({
  render() {
    return (<div>Not Found</div>)
  }
})

render((
  <Provider store={store}>
    <div>
    <Router history={history}>
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
        <Route path="/login" component={LoginContainer} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
    </div>
  </Provider>
  ),document.getElementById('app'))
