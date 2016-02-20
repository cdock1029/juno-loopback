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
      <div className='ui grid'>
        <div className='row'>
          <button className='ui tiny button' onClick={()=> this.props.dispatch(fetchProperties())}>{'\u21bb' + ' ' + 'Refresh'}</button>
        </div>
        <div className='row'>
          <PropertyList {...this.props} />
        </div>
      </div>
    )
  }
})

export default connect(({ juno: { properties, isFetching } }) => {
  return { properties, isFetching }
})(PropertyListContainer)
