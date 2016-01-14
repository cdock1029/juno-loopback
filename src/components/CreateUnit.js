import React from 'react'
import {connect} from 'react-redux'
import { saveUnitToProperty } from '../actions'

const CreateUnit = React.createClass({

  render() {
    return (
      <form onSubmit={this.addUnitToProperty}>
        <input ref={node => {
            this.input = node
          }} />
        <button type='submit'>Add Unit</button>
      </form>
    )
  },

  addUnitToProperty(e) {
    e.preventDefault()
    const {dispatch, property} = this.props
    dispatch(saveUnitToProperty(property, this.input.value))
  }

})

function mapStateToProps(state) {
  const {isFetching} = state
  return {
    isFetching
  }
}

export default connect(mapStateToProps)(CreateUnit)
