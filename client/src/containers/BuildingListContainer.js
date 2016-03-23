import React, { PropTypes } from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const BuildingListContainer = React.createClass({

  propTypes: {
    buildingId: PropTypes.number.isRequired,
    propertyId: PropTypes.number.isRequired,
    buildingEntities: PropTypes.object.isRequired,
    buildingIdList: PropTypes.array.isRequired,
  },

  render() {
    const {
      buildingId,
      propertyId,
      buildingEntities,
      buildingIdList,
    } = this.props
    return (
      <EntityList
        title={'Building'}
        size='eight wide mobile four wide tablet three wide computer'>
        {buildingIdList && buildingIdList
          .sort((a, b) => {
            const addressA = buildingEntities[a].address
            const addressB = buildingEntities[b].address
            if (addressA < addressB) return -1
            else if (addressA > addressB) return 1
            return 0
          })
          .map((id) => (
            <EntityListItem
              key={id}
              active={buildingId === id}
              path={`/${propertyId}/buildings/${id}/units`}
              text={buildingEntities[id].address} />
          ))
        })}
      </EntityList>
  )},
})

export default connect(({
  entities: {
    buildings: buildingEntities,
    properties,
  },
}, { propertyId }) => {
  let buildingIdList
  if (properties[propertyId]) {
    buildingIdList = properties[propertyId].buildings
  }
  return {
    buildingEntities,
    buildingIdList,
  }
})(BuildingListContainer)
