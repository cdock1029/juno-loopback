import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

const PropertyListContainer = React.createClass({

  propTypes: {
    propertyEntities: React.PropTypes.object.isRequired,
    propertyId: React.PropTypes.number.isRequired,
    propertyIdList: React.PropTypes.array.isRequired,
  },

  render() {
    const { propertyId, propertyEntities, propertyIdList } = this.props
    return (
      <EntityList
        title={'Property'}
        size='eight wide mobile four wide tablet three wide computer'>
        {propertyIdList
          .sort((a, b) => {
            const propA = propertyEntities[a].name
            const propB = propertyEntities[b].name
            if (propA < propB) return -1
            else if (propA > propB) return 1
            return 0
          })
          .map((id) => (
            <EntityListItem
              key={id}
              active={propertyId === id}
              path={`/${id}/buildings`}
              text={propertyEntities[id].name} />
          ))}
      </EntityList>
    )
  },
})

export default connect(({
  data: { properties: propertyIdList },
  entities: { properties: propertyEntities },
}) => ({
  propertyEntities,
  propertyIdList,
}))(PropertyListContainer)
