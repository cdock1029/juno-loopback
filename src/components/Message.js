import React from 'react'
import cx from 'classnames'


export default React.createClass({

  propTypes: {
    message: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
  },

  render() {
    return (
      <div className={cx('ui', this.props.type, 'message')}>
        <i className='close icon' onClick={this.props.closeMessage}/>
        <div className='header'>
          {this.props.type.toUpperCase()}
        </div>
        <p>{this.props.message}</p>
      </div>
    )
  }

})
