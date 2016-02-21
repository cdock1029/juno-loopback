'use strict';

import React from 'react'
import Parse from 'parse'
import {connect} from 'react-redux'

//TODO
//import { removeUnitFromPropertyAndDelete } from '../actions'

import BuildingList from '../components/BuildingList'

const BuildingListContainer = React.createClass({

  render() {
    const { buildings, params } = this.props
    return buildings ?
      <BuildingList buildings={buildings} {...params} />
      : null
  },

})

export default connect(({juno: { properties }}, ownProps) => {

  let buildings = null;
  if (properties.length) {
    const {propertyId} = ownProps.params;
    const property = properties.filter(
      prop => prop.id === ownProps.params.propertyId
    ).shift()
    buildings = property.get('buildings')
  }
  return {buildings}
})(BuildingListContainer)
