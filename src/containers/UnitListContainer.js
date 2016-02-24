import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const UnitListContainer = React.createClass({

  componentWillMount() {
    //TODO need to fetch units here?
  },

  render() {
    const {
      buildingId,
      propertyId,
      unitId,
      unitEntities,
      unitIdList
    } = this.props
    return (
      <EntityList title={'Unit'}>
        {unitIdList && unitIdList
          .sort((a,b) => unitEntities[a].number - unitEntities[b].number)
          .map((id) => {
          return (
            <EntityListItem
              key={id}
              active={unitId === id}
              path={`/${propertyId}/buildings/${unitId}/units/${id}`}
              text={unitEntities[id].number} />
          )
        })}
      </EntityList>
    )
  }

})

export default connect(({ data: { entities, result } }, { buildingId, propertyId }) => {
  let unitEntities, unitIdList;
  if (entities && result) {
    unitEntities = entities.units
    unitIdList = entities.buildings[buildingId].units
  }
  return {
    unitEntities,
    unitIdList
  }
})(UnitListContainer)
