'use strict';

import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

const BuildingList = React.createClass({
  render() {
    console.log('BuildingList - props:', this.props)
    const {buildings, buildingId, propertyId} = this.props
    return (
      <div className='ui relaxed divided link list'>
        {buildings.map((building) => {
          return (
            <Link
              className={cx({item: true, active: building.id === buildingId})}
              key={building.id}
              to={`/${propertyId}/buildings/${building.id}/units`}>
              {building.get('address')}
            </Link>
          )
        })}
      </div>
    )
  }
})

export default BuildingList
