import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import '../MyStyles/UserInfoNav.css'

function UserInfoNav() {

  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()  

  function handelLogOut(){
    setUser('')
    navigate('/')
  }

  return (
    <div className='navContainer'>
      <div className='webTitleContainer LRNav'>
        <span className='webTitle' onClick={()=>{navigate('/')}}>Grad Jobs</span>
      </div>
      <div>
        <span className='login logout' onClick={handelLogOut}>Logout</span>
      </div>
    </div>
  )
}

export default UserInfoNav