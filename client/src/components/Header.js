import React from 'react'

import { connect } from 'react-redux'
import { Link } from 'react-router'
import { logoutUser } from '../actions'

const Header = React.createClass({

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
  },

  logOut(e) {
    e.preventDefault()
    this.props.dispatch(logoutUser())
  },

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

})

export default connect()(Header)
