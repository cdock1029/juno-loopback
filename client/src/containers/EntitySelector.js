import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import PropertyListContainer from './PropertyListContainer'
import BuildingListContainer from './BuildingListContainer'
import UnitListContainer from './UnitListContainer'
import UnitDetailContainer from './UnitDetailContainer'
import TenantSearchContainer from './TenantSearchContainer'

const EntitySelector = ({ isFetching, params }) => (
  <div className='ui four column grid'>
      <div
        className={cx('ui', 'row segment')}
        style={{ minHeight: '14rem', maxHeight: '25rem' }}>
        <PropertyListContainer {...params} />
        {params.propertyId ? <BuildingListContainer {...params} /> : null}
        {params.buildingId ? <UnitListContainer {...params} /> : null}
        <TenantSearchContainer />
        <div className={cx('ui', { active: isFetching }, 'inverted dimmer')}>
          <div className='ui loader'></div>
        </div>
      </div>
    <div className='row'>
      {params.unitId ? <UnitDetailContainer {...params} /> : null}
    </div>
  </div>
)

EntitySelector.propTypes = {
  isFetching: React.PropTypes.number.isRequired,
  params: React.PropTypes.object.isRequired,
}

export default connect(({ isFetching }) => ({
  isFetching,
}))(EntitySelector)
