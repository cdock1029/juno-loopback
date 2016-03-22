import React from 'react'

import PropertyListContainer from './PropertyListContainer'
import BuildingListContainer from './BuildingListContainer'
import UnitListContainer from './UnitListContainer'

export default React.createClass({

  render() {
    const {params} = this.props
    return (
      <div className='ui four column grid'>
        <div className='row'>
            <PropertyListContainer {...params} />
            {params.propertyId ? <BuildingListContainer {...params} /> : null}
            {params.buildingId ? <UnitListContainer {...params} /> : null}
        </div>
      </div>
    )
  }
})
