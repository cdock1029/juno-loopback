import React from 'react'

export default ({children, title}) => (
  <div className='column'>
    <h3 className='ui header'>{title}</h3>
    <div className='ui relaxed divided link list'>
      {children}
    </div>
  </div>
)
