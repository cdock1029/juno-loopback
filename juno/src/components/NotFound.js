import React from 'react'

export default () => (
  <div style={{
    margin: '3em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', /* cross axis */
    justifyContent: 'flex-start', /* main axis */
    height: '100%'
  }}>
    <h1 className='ui header'>Not Found</h1>
    <img src='/img/giphy.gif'/>
  </div>
)
