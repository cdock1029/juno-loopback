import React from 'react'
import EntityList from '../components/EntityList'
import EntityListItem from '../components/EntityListItem'

import { connect } from 'react-redux'

import { fetchUnitsForBuilding } from '../actions'

const UnitListContainer = React.createClass({

  propTypes: {
    propertyId: React.PropTypes.string.isRequired,
    buildingId: React.PropTypes.string.isRequired,
    unitId: React.PropTypes.string,
    dispatch: React.PropTypes.func.isRequired,
    fetchUnitsForBuilding: React.PropTypes.func.isRequired,
    unitIdList: React.PropTypes.array.isRequired,
    unitEntities: React.PropTypes.object.isRequired,
    leaseEntities: React.PropTypes.object.isRequired,
    tenantEntities: React.PropTypes.object.isRequired,
  },

  componentWillMount() {
    const { buildingId, dispatch, fetchUnitsForBuilding: fetchUFB } = this.props
    dispatch(fetchUFB(buildingId))
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.buildingId !== nextProps.buildingId) {
      this.props.dispatch(this.props.fetchUnitsForBuilding(nextProps.buildingId))
    }
  },

  render() {
    const {
      buildingId,
      leaseEntities,
      propertyId,
      tenantEntities,
      unitEntities,
      unitId,
      unitIdList,
    } = this.props
    return (
      <EntityList
        title={'Unit'}
        size='eight wide mobile four wide tablet three wide computer'>
        {unitIdList
          .sort((a, b) => unitEntities[a].number - unitEntities[b].number)
          .map((id) => {
            const unit = unitEntities[id]
            // last item in unit.leases array...
            const lease = unit.leases && leaseEntities[unit.leases.slice(-1).pop()]
            // tenant
            const tenants = lease && lease.tenants.map(tId => tenantEntities[tId])
            return (
              <EntityListItem
                key={id}
                active={unitId === id}
                path={`/${propertyId}/buildings/${buildingId}/units/${id}`}
                text={
                  `${unit.number}\u00a0\u00a0\u00a0\u00a0${tenants ?
                    tenants.map(t => `${t.firstName} ${t.lastName}`) : ''}`
                } />
            )
          })}
      </EntityList>
    )
  },

})

export default connect(({
  data: { units: unitIdList },
  entities: {
    leases: leaseEntities,
    tenants: tenantEntities,
    units: unitEntities,
  },
}) => ({// TODO removed buildingId & propertyId. Still works??
  fetchUnitsForBuilding,
  unitIdList,
  leaseEntities,
  tenantEntities,
  unitEntities,
}))(UnitListContainer)
