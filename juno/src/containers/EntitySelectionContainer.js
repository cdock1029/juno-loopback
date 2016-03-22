import React from 'react'
import { connect } from 'react-redux'
import { fetchProperties } from '../actions'


/**
* Only purpose of this component (it seems..) is to load the shared data
* for the entity lists. Can't do it 1 step lower, because multiple instances of
* EntitySelector occur on page. Can't do it higher because Root is shared wth Login.
*
* TODO could move fetch to EntitySelector then check if first one (Properties)
* before loading. Then can get rid of this, if Routes are flattened. TODO
*
* This encapsulates the higherarchy and is loaded 1 time.
*/
const EntitySelectionContainer = React.createClass({

  componentWillMount() {
    const {dispatch, fetchData} = this.props
    dispatch(fetchProperties())
  },

  render() {
    const {children} = this.props
    return (
      <div>
        {children}
      </div>
    )
  },



})

export default connect(() => {
  return {
    fetchProperties
  }
})(EntitySelectionContainer)
