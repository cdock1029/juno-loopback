import React from 'react'

const Login = ({ login, passwordRef, usernameRef }) => (
  <form onSubmit={login}>
    <label>Username</label>
    <input type='text' ref={usernameRef} />
    <label>Password</label>
    <input type='password' ref={passwordRef} />
    <button type='submit'>Login</button>
  </form>
)

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  passwordRef: React.PropTypes.func.isRequired,
  usernameRef: React.PropTypes.func.isRequired,
}

export default Login
