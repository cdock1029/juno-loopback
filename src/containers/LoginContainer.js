import React from 'react'
import Parse from 'parse'

import Login from '../components/Login'

export default React.createClass({

  getInitialState() {
    return {
      error: null
    }
  },

  render() {
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
        user => console.log('logged in'),
        error => this.replaceState({...this.state, error: error.message})
      )
  }

})
