import React from 'react'
import cx from 'classnames'

export default ({children, title, size}) => (
  <div className={cx(size, 'column')}>
    <h4 className='ui header'>{title}</h4>
    <div className='ui relaxed divided link list'>
      {children}
    </div>
  </div>
)
