import React from 'react'

export default ({units}) => (
  <div className='ui relaxed divided link list'>
    {units.map((unit, i) => {
      return (
        <div className='item' key={i}>
          {unit.get('number')}
        </div>
      )
    })}
  </div>
)
