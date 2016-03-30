import React, { PropTypes } from 'react'
import { fetchTenantsSearch } from '../api/tenants'
import ReactTypeahead from 'react-typeahead'
import CustomTypeaheadList from '../components/CustomTypeaheadList'

const TenantSearchContainer = React.createClass({

  /* propTypes: {
  },*/

  getInitialState() {
    return {
      tenants: [],
    }
  },

  componentDidMount() {
    fetchTenantsSearch().then(response => {
      const { result, entities } = response
      const names = result.tenants.map(id => {
        const ten = entities.tenants[id]
        return `${ten.firstName} ${ten.middleName || ''} ${ten.lastName}`
      })
      this.setState({ tenants: names })
    })
  },

  render() {
    return (
      <div className='seven wide column'>
        <ReactTypeahead.Typeahead
          className='ui input'
          customListComponent={CustomTypeaheadList}
          options={this.state.tenants} />

        {/* <form className='ui small form'>
          <div className='field'>
            <label>Tenant search</label>
            <input type='text' placeholder='Name' name='name' />
          </div>
        </form>
        <div className='ui link list'>
          <a className='item'>Bill Brasky</a>
          <a className='item'>Bug Bunny</a>
          <a className='item'>William Wallace</a>
          <a className='item'>Lou Gherig</a>
        </div>*/}
      </div>
    )
  },

})

export default TenantSearchContainer
