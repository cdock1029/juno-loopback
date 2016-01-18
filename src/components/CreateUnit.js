import React from 'react'

export default ({addUnitToProperty, unitRef}) => (
  <form onSubmit={addUnitToProperty}>
    <input ref={unitRef} />
    <button type='submit'>Add Unit</button>
  </form>
)
