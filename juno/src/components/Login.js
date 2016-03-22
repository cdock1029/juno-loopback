import React from 'react'

export default ({login, passwordRef, usernameRef}) => (
  <form onSubmit={login}>
    <label>Username</label>
    <input type='text' ref={usernameRef} />
    <label>Password</label>
    <input type='password' ref={passwordRef} />
    <button type='submit'>Login</button>
  </form>
)
