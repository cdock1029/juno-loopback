import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions'

const EntitySelectionContainer = React.createClass({

  componentWillMount() {
    const {dispatch, fetchData} = this.props
    dispatch(fetchData)
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
    fetchData
  }
})(EntitySelectionContainer)
