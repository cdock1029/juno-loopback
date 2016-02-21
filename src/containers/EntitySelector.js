import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'
import { fetchListIfNeeded } from '../actions'

import { connect } from 'react-redux'


const EntitySelector = React.createClass({

  componentWillReceiveProps(nextProps) {
    /*const nextBuildingId = nextProps.params.buildingId
    const currBuildingId = this.props.params.buildingId
    if (nextBuildingId !== currBuildingId && nextBuildingId !== null) {
      console.log('EntitySelector - componentWillReceiveProps New buildingId')
      console.log(`currBuildingId: ${currBuildingId}, nextBuildingId: ${nextBuildingId}`)
      const {dispatch, units} = this.props
      debugger
      dispatch(fetchListIfNeeded(units))
    }*/
  },
  //will show 1 to 4 EntityList(s)
  render() {
    const location = this.props.location.pathname
    const {buildings, params, properties, units} = this.props
    const {propertyId, buildingId, unitId} = params
    return (
      <div className='ui four column grid'>
        <div className='row'>
            <EntityList title={'Properties'}>
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
              (<EntityList title={'Buildings'}>
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
              (<EntityList title={'Units'}>
                {units.map((item, i) => {
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

export default connect(({ juno: { properties } }, ownProps) => {
  console.log('EntitySelector - connect')
  let buildings, units = null;
  //if we've navigated to specific property
  if (properties.length && ownProps.params.propertyId) {
    const {propertyId} = ownProps.params
    const property = properties.filter(
      prop => prop.id === propertyId
    ).shift()
    buildings = property.get('buildings')
  }
  //if we've navigated to specific building
  if (buildings && buildings.length && ownProps.params.buildingId) {
    const {buildingId} = ownProps.params
    const building = buildings.filter(
      b => b.id === buildingId
    ).shift()
    units = building.get('units')
  }
  return {
    buildings,
    properties,
    units
  }
})(EntitySelector)
