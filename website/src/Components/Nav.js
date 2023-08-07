import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../MyStyles/Nav.css'
import { UserContext } from '../Context/UserContext'

function Nav() {

  const navigate = useNavigate()
  const {user} = useContext(UserContext)

  const LoginStatus = () =>{
    if(user === ''){
      return <span className='login' onClick={()=> navigate('/login')}>Login</span>
    }else{
      return <span className='login' onClick={()=>navigate('/userInfo')}>User Info</span>
    } 
  }

  return (
    <div className='navContainer'>
      <div className='webTitleContainer'>
        <span className='webTitle' onClick={()=>{navigate('/')}}>Grad Jobs</span>
      </div>
      <div className='gridNav'>
        <div className='flow'>
          <span className='hoverNav' onClick={()=>{navigate('/aboutUs')}}>About Us</span>
        </div>
        <div className='flow'>
          <LoginStatus/>
        </div>
      </div>
    </div>
  )
}

export default Nav