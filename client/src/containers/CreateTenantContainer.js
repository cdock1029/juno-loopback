import React from 'react'
import { connect } from 'react-redux'
import CreateTenantForm from '../components/CreateTenantForm'

const CreateTenantContainer = React.createClass({

  handleSubmit(_data) {
    // console.log('handleSubmit - data: ', data)
  },

  render() {
    return (
      <div>
        <h5>Create tenant</h5>
        <CreateTenantForm onSubmit={this.handleSubmit} />
      </div>
    )
  },

})

// TODO what's this for? is it Needed??
export default connect()(CreateTenantContainer)
