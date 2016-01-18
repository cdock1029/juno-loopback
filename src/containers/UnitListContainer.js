import React from 'react'
import Parse from 'parse'
import {connect} from 'react-redux'
import { removeUnitFromPropertyAndDelete } from '../actions'

import UnitList from '../components/UnitList'

const UnitListContainer = React.createClass({

  render() {
    const { units } = this.props
    return units ? <UnitList units={units} onClick={this.deleteUnit} /> : null
  },

  deleteUnit(unit) {
    const {dispatch, property} = this.props
    dispatch(removeUnitFromPropertyAndDelete(property, unit))
  }

})

export default connect(state => state)(UnitListContainer)
