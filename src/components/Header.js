import React from 'react'
import Parse from 'parse'

export default React.createClass({

  render() {
    return (
      <div style={{position: 'fixed', top: 0, height: '4em'}}>
        <span>Yo</span>
        <span>What's</span>
        <span>Up</span>
        <span><button onClick={this.logOut}>Log out</button></span>
      </div>
    )
  },

  logOut(e) {
    e.preventDefault()
    console.log('logging out')
    Parse.User.logOut()
  }

})
