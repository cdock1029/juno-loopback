import React from 'react'
import Parse from 'parse'

import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logoutUser } from '../actions'

const Header = React.createClass({

  render() {
    return (
      <div className='ui top fixed menu'>
        <Link className='item' to='/new-tenant'>Add new tenant</Link>
        <div className='right menu'>
          <a className='item' onClick={this.logOut}>Log out</a>
        </div>
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
