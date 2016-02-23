import React from 'react'
import { connect } from 'react-redux'
import { fetchData } from '../actions'


const Tester = React.createClass({

  componentWillMount() {
    console.log('Tester componentWillMount - dispatching')
    const {dispatch, fetchData} = this.props
    dispatch(fetchData)
  },

  render() {
    console.log('Tester rendering')
    const {collection, properties} = this.props
    return(
      <div>
        {collection && properties ?
        (
          <ol>
            {collection.map(id => {
              return <li key={id}>{properties[id].name}</li>
            })}
          </ol>
        )
        : <h1>Not yet.......</h1>}
      </div>
    )
  }

})

export default connect(({ data: { entities, result } }) => {
  let collection, properties;
  if (entities && result) {
    properties = entities.properties
    collection = result.properties
  }
  return {
    collection,
    fetchData,
    properties
  }
})(Tester)
