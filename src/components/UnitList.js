import React from 'react'

export default ({onClick, units}) => (
  <ul style={{maxHeight: '20em', overflow: 'scroll'}}>
    {units.map((unit, i) => {
      return (
        <li key={i}>
          {unit.get('unitNumber')}
          <span>{' '}<button onClick={onClick.bind(null, unit)} style={{color: 'red'}}>X</button></span>
        </li>
      )
    })}
  </ul>
)
