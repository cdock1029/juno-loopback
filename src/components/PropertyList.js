import React from 'react'
import { Link } from 'react-router'
import UnitListContainer from '../containers/UnitListContainer'

export default ({ isFetching, properties }) => (
  <div style={{marginTop: '4em', width: '15em'}}>
    <ol>
      {properties.map(prop =>
        <li key={prop.id}>
          <Link to={`/units/${prop.id}`}>{prop.get('name')}</Link>
        </li>
      )}
    </ol>
    {isFetching && <h2>Fetching....</h2>}
  </div>
)
