import React from 'react'

export default ({children, title}) => (
  <div className='column'>
    <h2 className='ui header'>{title}</h2>
    <div className='ui relaxed divided link list'>
      {children}
    </div>
  </div>
)
