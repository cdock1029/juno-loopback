import React from 'react'
import Parse from 'parse'

export default React.createClass({

  getInitialState() {
    return { user: Parse.User.current() }
  },

  render() {
    console.log('Root:props:', this.props)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})
