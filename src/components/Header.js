import React from 'react'
import Parse from 'parse'

import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logoutUser } from '../actions'

const Header = React.createClass({

  render() {
    return (
      <div style={{position: 'fixed', top: 0, height: '3em'}}>
        <Link to='/new-tenant'>Add new tenant</Link>
        <span>What's</span>
        <span>Up</span>
        <span><button onClick={this.logOut}>Log out</button></span>
      </div>
    )
  },

  logOut(e) {
    e.preventDefault()
    this.props.dispatch(logoutUser())
    //Parse.User.logOut().then(() => this.props.dispatch(routeActions.push('/login')))
  }

})

export default connect()(Header)
