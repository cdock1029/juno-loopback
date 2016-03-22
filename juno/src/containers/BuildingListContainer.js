import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const BuildingListContainer = React.createClass({

  render() {
    const {buildingId, propertyId, buildingEntities, buildingIdList} = this.props
    return (
      <EntityList
        title={'Building'} 
        size='eight wide mobile four wide tablet three wide computer'>
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

export default connect(({
  entities: {
    buildings: buildingEntities,
    properties
  }
}, { propertyId }) => {
  let buildingIdList;
  if (properties[propertyId]) {
    buildingIdList = properties[propertyId].buildings
  }
  return {
    buildingEntities,
    buildingIdList
  }
})(BuildingListContainer)
