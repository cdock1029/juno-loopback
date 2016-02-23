import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'


const EntitySelector = React.createClass({

  componentWillReceiveProps(nextProps) {

  },

  render() {
    const location = this.props.location.pathname
    const {buildings, params, properties, units} = this.props
    const {propertyId, buildingId, unitId} = params
    return (
      <div className='ui four column grid'>
        <div className='row'>
            <EntityList title={'Property'}>
              {properties.map((item, i) => {
                const text = item.get('name')
                return (
                  <EntityListItem
                    key={i}
                    active={propertyId === item.id}
                    path={`/${item.id}/buildings`}
                    text={text} />
                )
              })}
            </EntityList>
            {buildings ?
              (<EntityList title={'Building'}>
                {buildings.map((item, i) => {
                  const text = item.get('address')
                  return (
                    <EntityListItem
                      key={i}
                      active={buildingId === item.id}
                      path={`/${propertyId}/buildings/${item.id}/units`}
                      text={text} />
                  )
                })}
              </EntityList>)
              : null}
            {units ?
              (<EntityList title={'Unit'}>
                {units
                  .sort((a,b) => a.get('number') - b.get('number'))
                  .map((item, i) => {
                    const text = item.get('number')
                    return (
                      <EntityListItem
                        key={i}
                        active={params.unitId === item.id}
                        path={`/${propertyId}/buildings/${buildingId}/units/${item.id}`}
                        text={text} />
                    )
                })}
              </EntityList>)
              : null}
        </div>
      </div>
    )
  },

  entityTextAttribute(type) {
    switch (type) {
      case 'Property':
        return 'name'
      case 'Building':
        return 'address'
      case 'Unit':
        return 'number'
      default:
        return 'name'
    }
  }

})

export default connect(({ data: { entities, result } }, ownProps) => {

  let {allProperties, allBuildings, allUnits} = entities;

  //if we've navigated to specific property
  if (allProperties && ownProps.params.propertyId) {
    const {propertyId} = ownProps.params
    const property = properties[propertyId]
     = property.buildings.map(id => )
  }
  //if we've navigated to specific building
  if (buildings && ownProps.params.buildingId) {
    const {buildingId} = ownProps.params
    const building = buildings[buildingId]
    units = building.units
  }
  return {
    buildings,
    properties,
    units
  }
})(EntitySelector)
