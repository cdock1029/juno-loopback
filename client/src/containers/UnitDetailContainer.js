import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

const UnitDetailContainer = ({ unit }) => (
  <div className='eight wide column'>
    <div className='ui raised segment'>
      <div className='ui teal ribbon label'>
        {unit && `${unit.building.address}-${unit.number}`}
      </div>
      <span>{unit && unit.property.name}</span>
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <div className='ui two column grid'>
          <div className='column'>
            <h5>Current Tenant(s)</h5>
            <div className='ui list'>
            </div>
          </div>
          <div className='column'>
            <h5>Lease</h5>
            <div className='ui list'>
              {unit && unit.leases.map((l, i) => (
                <div className='item' key={i}>
                  {l.rent / 100.0}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

UnitDetailContainer.propTypes = {
  unit: PropTypes.object,
}

const getProperty = (state, props) => (
  state.entities.properties[parseInt(props.propertyId, 10)]
)
const getBuilding = (state, props) => (
  state.entities.buildings[parseInt(props.buildingId, 10)]
)
const getUnit = (state, props) => (
  state.entities.units[parseInt(props.unitId, 10)]
)
// TODO leases, lease? think about how handling showing 1 or more
const getLeases = (state) => state.entities.leases

const getLeasesSelector = createSelector(
  [getUnit, getLeases],
  (unit, leases) => (
    unit && leases && unit.leases.map(leaseId => leases[leaseId])
  )
)

const getUnitSelector = createSelector(
  [getProperty, getBuilding, getUnit, getLeasesSelector],
  (property, building, unit, leases) => unit && property && building && leases && ({
    ...unit,
    property,
    building,
    leases,
  })
)

const mapStateToProps = (state, props) => ({
  unit: getUnitSelector(state, props),
})

export default connect(
  mapStateToProps
)(UnitDetailContainer)
