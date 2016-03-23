import React from 'react'
import cx from 'classnames'

const Message = React.createClass({

  propTypes: {
    index: React.PropTypes.number.isRequired,
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    closeMessage: React.PropTypes.func.isRequired,
  },

  _closeMessage() {
    this.props.closeMessage(this.props.index)
  },

  render() {
    const { message, type } = this.props
    return (
      <div className={cx('ui', this.props.type, 'message')}>
        <i className='close icon' onClick={this._closeMessage} />
        <div className='header'>
          {type.toUpperCase()}
        </div>
        <p>{message}</p>
      </div>
    )
  },

})

export default Message
