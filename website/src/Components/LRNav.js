import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../MyStyles/LRNav.css'

function LRNav() {

  const navigate = useNavigate()

  return (
    <div className='navContainer'>
      <div className='webTitleContainer LRNav'>
        <span className='webTitle' onClick={()=>{navigate('/')}}>Grad Jobs</span>
      </div>
    </div>
  )
}

export default LRNav