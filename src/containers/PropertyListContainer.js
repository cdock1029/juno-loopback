import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

import Header from '../components/Header'
import PropertyList from '../components/PropertyList'

const PropertyListContainer = React.createClass({

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchProperties())
  },

  render() {
    console.log('PropertyListContainer: props:', this.props)
    return (
      <div>
        <Header {...this.props} />
        <PropertyList {...this.props} />
      </div>
    )
  }
})

export default connect(({ juno: { properties, isFetching } }) => {
  return { properties, isFetching }
})(PropertyListContainer)
