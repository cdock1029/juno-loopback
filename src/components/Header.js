import React from 'react'
import Parse from 'parse'

import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

const Header = React.createClass({

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
    Parse.User.logOut().then(() => this.props.dispatch(routeActions.push('/login')))
  }

})

export default connect()(Header)
