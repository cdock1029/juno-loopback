import React from 'react'
import Parse from 'parse'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

import Login from '../components/Login'

const LoginContainer = React.createClass({

  getInitialState() {
    return {
      error: null
    }
  },

  render() {
    console.log('LoginContainer - props:', this.props)
    return <Login error={this.state.error} login={this.login} passwordRef={this.passwordRef} usernameRef={this.usernameRef} />
  },

  usernameRef(node) {
    this.usernameInput = node
  },

  passwordRef(node) {
    this.passwordInput = node
  },

  login(e) {
    e.preventDefault()
    Parse.User.logIn(this.usernameInput.value, this.passwordInput.value)
      .then(
        user => {
          const { dispatch, location } = this.props
          console.log('logged in, location:', location)
          if (location.state && location.state.nextPathname) {
            dispatch(routeActions.push(location.state.nextPathname))
          } else {
            dispatch(routeActions.push('/'))
          }
        },
        error => this.replaceState({...this.state, error: error.message})
      )
  }

})

export default connect()(LoginContainer)
