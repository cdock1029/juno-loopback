import React from 'react'
import Parse from 'parse'

import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logoutUser } from '../actions'

const Header = React.createClass({

  render() {
    return (
      <div className='ui top fixed menu'>
        <div className='ui container'>
          <Link className='item' to='/new-tenant'>Add new tenant</Link>
          <div className='right menu'>
            <a className='item' onClick={this.logOut}>Log out</a>
          </div>
        </div>
      </div>
    )
  },

  logOut(e) {
    e.preventDefault()
    this.props.dispatch(logoutUser())
  }

})

export default connect()(Header)
