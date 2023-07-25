import React from 'react'


function BroadAreas({areas,id}) {

  return (
    <option id='options' value={areas}>{areas}</option>
  )
}

export default BroadAreas