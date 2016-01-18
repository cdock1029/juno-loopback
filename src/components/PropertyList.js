import React from 'react'
import CreateUnitContainer from '../containers/CreateUnitContainer'
import UnitListContainer from '../containers/UnitListContainer'

export default ({ isFetching, properties }) => (
  <div style={{marginTop: '4em', width: '15em'}}>
    <ol>
      {properties.map(prop =>
        <li key={prop.id}>
          <div>Name: {prop.get('name')}</div>
          <CreateUnitContainer property={prop} />
          <UnitListContainer property={prop} units={prop.get('units')} />
        </li>
      )}
    </ol>
    {isFetching && <h2>Fetching....</h2>}
  </div>
)
