import React from 'react'
import {connect} from 'react-redux'
import CreateTenantForm from '../components/CreateTenantForm'

const CreateTenantContainer = React.createClass({

  render() {
    return (
      <div>
        <h5>Create tenant</h5>
        <CreateTenantForm onSubmit={this.handleSubmit} />
      </div>
    )
  },

  handleSubmit(data) {
    debugger;
    console.log('handleSubmit - data: ', data)
  }


})

export default connect()(CreateTenantContainer)
