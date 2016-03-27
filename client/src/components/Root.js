import React, { PropTypes } from 'react'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Header from './Header'
import Message from './Message'

import { dismissMessage } from '../actions'
import { connect } from 'react-redux'

const Root = React.createClass({

  propTypes: {
    children: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    dismissMessage: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
  },

  _closeMessage(i) {
    const { dismissMessage: dm, dispatch } = this.props
    dispatch(dm(i))
  },

  render() {
    // TODO cleanup
    const { children, location, user, messages } = this.props
    let header = null
    if (user && location.pathname !== '/login') {
      header = <Header />
    }
    // TODO put ReactCSSTransitionGroup back here, or refactor
    return (
      <div
        className='ui container'
        style={{ marginTop: '6em' }}
        transitionName='main'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}>
        {header}
        {messages.map((m, i) => (
          <Message
            key={i}
            index={i}
            closeMessage={this._closeMessage}
            {...m} />
          ))}
        {children}
      </div>
    )
  },

})

export default connect(({ user, messages }) => ({
  dismissMessage,
  user,
  messages,
}))(Root)
