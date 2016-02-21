import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'

import PropertyList from '../components/PropertyList'

function getKids(children) {
  let kids = []
  if (children) {

    kids.push(children)
    return kids.concat(getKids(children.props.children))

  }
  return kids
}

const PropertyListContainer = React.createClass({

  componentWillMount() {
    /*const props = this.props
    if (!props.properties.length) {
      props.dispatch(props.fetchProperties())
    }*/
  },

  render() {
    console.log('PropertyList - render - children:', this.props.children)
    const {children} = this.props
    let kids = getKids(children)
    return (
      <div className='ui four column grid'>
        <div className='row'>
          <div className='column'>
            <button className='ui tiny button' onClick={()=> this.props.dispatch(fetchProperties())}>{'\u21bb' + ' ' + 'Refresh'}</button>
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <PropertyList {...this.props} />
          </div>
          {kids.map((kid, i)=> (
            <div key={i} className='column'>
              {kid}
            </div>
          ))}
        </div>
      </div>
    )
  }
})

export default connect(({ juno: { properties } }) => {
  return {
    properties,
    fetchProperties
  }
})(PropertyListContainer)
