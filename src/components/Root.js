import React from 'react'
import Header from '../components/Header'
import { connect } from 'react-redux'

const Root = React.createClass({

  render() {
    const {children, error, isFetching, location, user} = this.props
    let header = null
    if (user && location.pathname !== '/login') {
      header = <Header />
    }
    return (
      <div className='ui container' style={{marginTop: '6em'}}>
        {header}
        {children}
        {isFetching && <h2 className='ui header'>Fetching....</h2>}
        {error ? <h1>{error}</h1> : null}
      </div>
    )
  }
})

export default connect(({juno: {user, isFetching, error}}) => {
  return {isFetching, user, error}
})(Root)
