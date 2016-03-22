import React from 'react'
import {connect} from 'react-redux'
import { saveUnitToProperty } from '../actions'

import CreateUnit from '../components/CreateUnit'

const CreateUnitContainer = React.createClass({

  render() {
    return <CreateUnit addUnitToProperty={this.addUnitToProperty}
      unitRef={this.unitRef} />
  },

  addUnitToProperty(e) {
    e.preventDefault()
    const {dispatch, property} = this.props
    dispatch(saveUnitToProperty(property, this.input.value))
  },

  unitRef(node) {
    this.input = node
  }

})

function mapStateToProps(state) {
  const {isFetching} = state
  return {
    isFetching
  }
}

export default connect(mapStateToProps)(CreateUnitContainer)
