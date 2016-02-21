import React from 'react'
import Parse from 'parse'
import {connect} from 'react-redux'
import {fetchListIfNeeded} from '../actions'

import UnitList from '../components/UnitList'
import EntitySelector from './EntitySelector'

const UnitListContainer = React.createClass({

  componentWillMount() {
    console.log('UnitListContainer - componentWillMount')
    this.fetchUnits(this.props)
  },

  componentWillReceiveProps(nextProps) {
    console.log('UnitListContainer - componentWillReceiveProps:', nextProps.units)
    this.fetchUnits(nextProps)
  },

  render() {
    console.log('UnitListContainer - render')
    const { units } = this.props
    return units ?
      <UnitList units={units} />
      : null
  },

  fetchUnits(props) {
    if (props.units) {
      debugger
      props.dispatch(props.fetchListIfNeeded(props.units))
    }
  }

})

export default connect(({juno: { properties }}, ownProps) => {
  console.log('UnitListContainer - connect(..)')
  let units = null
  if (properties.length) {
    const propertyId = ownProps.params.propertyId
    const buildingId = ownProps.params.buildingId
    const property = properties.filter(prop => prop.id === propertyId).shift()
    const building = property.get('buildings').filter(
      b => b.id === buildingId
    ).shift()

    units = building.get('units');
    debugger
  }
  return { fetchListIfNeeded, units };
})(UnitListContainer)
