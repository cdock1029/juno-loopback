import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

import PropertyList from '../components/PropertyList'

const PropertyListContainer = React.createClass({

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProperties())
  },

  render() {
    return <PropertyList {...this.props} />
  }
})

export default connect(({properties, isFetching}) => {
  return { properties, isFetching }
})(PropertyListContainer)
