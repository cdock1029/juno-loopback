import React from 'react'
import { connect } from 'react-redux'

import { loginUser } from '../actions'
import Login from '../components/Login'

const LoginContainer = React.createClass({

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
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
  },

  render() {
    return (
      <Login
        login={this.login}
        passwordRef={this.passwordRef}
        usernameRef={this.usernameRef} />
    )
  },


})

export default connect(() => {})(LoginContainer)
