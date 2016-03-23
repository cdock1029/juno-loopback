import React from 'react'

import PropertyListContainer from './PropertyListContainer'
import BuildingListContainer from './BuildingListContainer'
import UnitListContainer from './UnitListContainer'

const EntitySelector = ({ params }) => (
  <div className='ui four column grid'>
    <div className='row'>
        <PropertyListContainer {...params} />
        {params.propertyId ? <BuildingListContainer {...params} /> : null}
        {params.buildingId ? <UnitListContainer {...params} /> : null}
    </div>
  </div>
)

EntitySelector.propTypes = {
  params: React.PropTypes.object.isRequired,
}

export default EntitySelector
