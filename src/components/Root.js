import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'

import Parse from 'parse'
import ParseReact from 'parse-react'

import PropertyListContainer from '../containers/PropertyListContainer'
import LoginContainer from '../containers/LoginContainer'
import Header from './Header'

const store = configureStore()

export default React.createClass({

  mixins: [ParseReact.Mixin],

  observe() {
    return {
      user: ParseReact.currentUser
    }
  },

  render() {
    const ui = this.data.user ?
      (<div>
        <Header />
        <Provider store={store}>
          <PropertyListContainer />
        </Provider>
      </div>) :
      <LoginContainer />

    return ui
  }
})
