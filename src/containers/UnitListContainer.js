import React from 'react'
import Parse from 'parse'
import {connect} from 'react-redux'
import { removeUnitFromPropertyAndDelete } from '../actions'

import CreateUnitContainer from '../containers/CreateUnitContainer'
import UnitList from '../components/UnitList'

const UnitListContainer = React.createClass({

  render() {
    const { property, units } = this.props
    return units ? (
      <div>
        <h4>{property.get('name')}</h4>
        <CreateUnitContainer property={property} />
        <UnitList units={units} onClick={this.deleteUnit} />
      </div>
    ) : null
  },

  deleteUnit(unit) {
    const {dispatch, property} = this.props
    dispatch(removeUnitFromPropertyAndDelete(property, unit))
  }

})

export default connect(({juno: { properties }}, ownProps) => {
  const id = ownProps.params.id;
  const property = properties.filter(prop => prop.id === id).shift()
  const units = property.get('units');
  return { property, units };
})(UnitListContainer)
