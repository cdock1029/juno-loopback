import React from 'react'
import { connect } from 'react-redux'
import { saveUnitToProperty } from '../actions'

import CreateUnit from '../components/CreateUnit'

const CreateUnitContainer = React.createClass({

  propTypes: {
    dispatch: React.PropTypes.func.isRequired,
    property: React.PropTypes.object.isRequired,
  },

  addUnitToProperty(e) {
    e.preventDefault()
    const { dispatch, property } = this.props
    dispatch(saveUnitToProperty(property, this.input.value))
  },

  unitRef(node) {
    this.input = node
  },

  render() {
    return (
      <CreateUnit
        addUnitToProperty={this.addUnitToProperty}
        unitRef={this.unitRef} />
    )
  },

})

// TODO what am I doing with isFetching ? Can get rid of this??
export default connect(({ isFetching }) => ({
  isFetching,
}))(CreateUnitContainer)
