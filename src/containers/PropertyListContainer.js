import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

import PropertyList from '../components/PropertyList'

const PropertyListContainer = React.createClass({

  componentDidMount() {
    const { dispatch, properties } = this.props
    if (!properties.length) {
      dispatch(fetchProperties())
    }
  },

  render() {
    return (
      <div>
        <br/>
        <br/>
        <button onClick={()=> this.props.dispatch(fetchProperties())}>{'\u21bb' + ' ' + 'Refresh'}</button>
        <PropertyList {...this.props} />
      </div>
    )
  }
})

export default connect(({ juno: { properties, isFetching } }) => {
  return { properties, isFetching }
})(PropertyListContainer)
