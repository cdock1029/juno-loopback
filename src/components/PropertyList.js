'use strict';

import React from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

const PropertyList = React.createClass({

  render() {
    const { properties, params } = this.props
    return (
      <div className='ui relaxed divided link list'>
        {properties.map(prop =>
          <Link className={cx({item: true, active: prop.id === params.propertyId})} key={prop.id} to={`/${prop.id}/buildings`}>{prop.get('name')}</Link>
        )}
      </div>
    )
  }
})

export default PropertyList
