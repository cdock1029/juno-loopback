import React from 'react'
import {connect} from 'react-redux'

const CreateTenantContainer = React.createClass({

  render() {
    return (
      <div>
        <h5>Create tenant</h5>
      </div>
    )
  }

})

export default connect()(CreateTenantContainer)
