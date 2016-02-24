import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const BuildingListContainer = React.createClass({

  render() {
    const {buildingId, propertyId, buildingEntities, buildingIdList} = this.props
    return (
      <EntityList title={'Building'}>
        {buildingIdList && buildingIdList
          .sort((a,b) => {
            const addressA = buildingEntities[a].address
            const addressB = buildingEntities[b].address
            return addressA < addressB ? -1
              : addressA > addressB ? 1
              : 0
          })
          .map((id) => {
          return (
            <EntityListItem
              key={id}
              active={buildingId === id}
              path={`/${propertyId}/buildings/${id}/units`}
              text={buildingEntities[id].address} />
          )
        })}
      </EntityList>
    )
  }

})

export default connect(({ data: { entities, result } }, { propertyId }) => {
  let buildingEntities, buildingIdList;
  if (entities && result) {
    buildingEntities = entities.buildings
    buildingIdList = entities.properties[propertyId].buildings
  }
  return {
    buildingEntities,
    buildingIdList
  }
})(BuildingListContainer)
