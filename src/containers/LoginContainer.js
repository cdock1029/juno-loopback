import React from 'react'
import Parse from 'parse'
import { connect } from 'react-redux'

import { loginUser } from '../actions'
import Login from '../components/Login'

const LoginContainer = React.createClass({

  render() {
    return <Login login={this.login}
      passwordRef={this.passwordRef}
      usernameRef={this.usernameRef} />
  },

  usernameRef(node) {
    this.usernameInput = node
  },

  passwordRef(node) {
    this.passwordInput = node
  },

  login(e) {
    e.preventDefault()
    this.props.dispatch(loginUser(this.usernameInput.value, this.passwordInput.value))
  }

})

export default connect(() => {
  return {}
})(LoginContainer)
