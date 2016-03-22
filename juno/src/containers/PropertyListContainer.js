import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const PropertyListContainer = React.createClass({

  render() {
    const {propertyId, propertyEntities, propertyIdList} = this.props
    return (
      <EntityList
        title={'Property'}
        size='eight wide mobile four wide tablet three wide computer'>
        {propertyIdList
          .sort((a,b) => {
            const propA = propertyEntities[a].name
            const propB = propertyEntities[b].name
            return propA < propB ? -1
              : propA > propB ? 1
              : 0
          })
          .map((id) => {
          return (
            <EntityListItem
              key={id}
              active={propertyId === id}
              path={`/${id}/buildings`}
              text={propertyEntities[id].name} />
          )
        })}
      </EntityList>
    )
  }

})

export default connect(({
  data: { properties: propertyIdList },
  entities: { properties: propertyEntities }
}) => {

  return {
    propertyEntities,
    propertyIdList
  }
})(PropertyListContainer)
