import React from 'react'

export default ({onClick, units}) => (
  <div className='ui list'>
    {units.map((unit, i) => {
    return (
    <div className='item' key={i}>
      <div className='right floated content'>
        <div className='ui mini button' onClick={onClick.bind(null, unit)} style={{color: 'red'}}>
        X
        </div>
      </div>
          <div className='content'>
            {unit.get('unitNumber')}
          </div>
        </div>
      )
    })}
  </div>
)
