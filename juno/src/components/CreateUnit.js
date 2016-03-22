import React from 'react'

export default ({addUnitToProperty, unitRef}) => (
  <form className="ui form" onSubmit={addUnitToProperty}>
    <div className='ui small action input'>
      <input type='text' placeholder='Unit number' ref={unitRef} />
      <button className='ui button' type='submit'>Add Unit</button>
    </div>
  </form>
)
