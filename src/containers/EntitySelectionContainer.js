import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

const EntitySelectionContainer = React.createClass({

  componentWillMount() {
    /*const props = this.props
    if (!props.properties.length) {
      props.dispatch(props.fetchProperties())
    }*/
  },

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
})

export default connect(({ juno: { properties } }) => {
  return {
    properties,
    fetchProperties
  }
})(EntitySelectionContainer)
