import React from 'react'
import '../MyStyles/Requisits.css'

function Requisits({requisits,id}) {

  const MakeList = () =>{
     return requisits.map((req,index) => (
        <li key={index} className='req'>{req}</li>
     ))
  }

  return (
    <div>
        <ul>
            <MakeList key={id}/>
        </ul>
    </div>
  )
}

export default Requisits