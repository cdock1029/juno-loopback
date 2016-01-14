import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

import CreateUnit from './CreateUnit'
import UnitList from './UnitList'

class PropertyList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {dispatch} = this.props
    dispatch(fetchProperties())
  }

  render() {
    const {isFetching, properties} = this.props
    console.log(properties)
    return (
      <div style={{width: '15em'}}>
        <ol>
          {properties.map(prop =>
            <li key={prop.id}>
              <div>Name: {prop.get('name')}</div>
              <CreateUnit property={prop} />
              <UnitList property={prop} units={prop.get('units')} />
            </li>
          )}
        </ol>
        {isFetching && <h2>Fetching....</h2>}
      </div>
    )
  }
}

export default connect(({properties, isFetching}) => {
  return { properties, isFetching }
})(PropertyList)
