import React from 'react'
import Parse from 'parse'
import {connect} from 'react-redux'
import { removeUnitFromPropertyAndDelete } from '../actions'

const UnitList = React.createClass({

  render() {
    const {units} = this.props
    return units ?
      <ul style={{maxHeight: '20em', overflow: 'scroll'}}>
        {units.map((unit, i) => {
          return (
            <li key={i}>
              {unit.get('unitNumber')}
              <span>{' '}<button onClick={this.deleteUnit.bind(this, unit)} style={{color: 'red'}}>X</button></span>
            </li>
          )
        })}
      </ul> : null
  },

  deleteUnit(unit) {
    const {dispatch, property} = this.props
    dispatch(removeUnitFromPropertyAndDelete(property, unit))
  }

})

export default connect(state => ({...state}))(UnitList)
