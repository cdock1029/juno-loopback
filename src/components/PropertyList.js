import React from 'react'
import { Link } from 'react-router'
import UnitListContainer from '../containers/UnitListContainer'

export default ({ isFetching, properties }) => (
  <div className='ui link list'>
    {properties.map(prop =>
      <Link className='item' key={prop.id} to={`/units/${prop.id}`}>{prop.get('name')}</Link>
    )}
    {isFetching && <h2 className='ui header'>Fetching....</h2>}
  </div>
)
