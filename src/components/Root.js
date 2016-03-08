import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Header from './Header'
import Message from './Message'

import { dismissMessage } from '../actions'
import { connect } from 'react-redux'

const Root = React.createClass({

  render() {
    //TODO cleanup
    const {children, isFetching, location, user, messages} = this.props
    let header = null
    if (user && location.pathname !== '/login') {
      header = <Header />
    }
    return (
      <ReactCSSTransitionGroup className='ui container' style={{marginTop: '6em'}} transitionName='main' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {header}
        {messages.map((m, i) => (
          <Message
            key={i}
            closeMessage={this.closeMessage.bind(null, i)} {...m} />
          ))}
        {children}
        {isFetching ? <h1 className='ui header'>Fetching something....</h1> : null}
      </ReactCSSTransitionGroup>
    )
  },

  closeMessage(i) {
    const {dismissMessage, dispatch} = this.props
    dispatch(dismissMessage(i))
  }
})

export default connect(({user, messages, isFetching}) => {
  return {
    dismissMessage,
    isFetching,
    user,
    messages
  }
})(Root)
