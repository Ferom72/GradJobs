import React,{useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../MyStyles/LoginRegister.css'
import { UserContext } from '../Context/UserContext';

function Login() {

  const navigate = useNavigate()
  const {setUserStatus} = useContext(UserContext)

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async(e) =>{
    e.preventDefault()

    const {username,password} = login

    try{
      const {data} = await axios.post("/login",{username,password})

      if(data.error){
        return console.log(data.error)
      }else{
        setLogin({})
        setUserStatus(true)
        navigate('/')
      }
    }catch(e){
      console.log(e.error)
    }
  }

  return (
    <div className="loginRegisterOut">
    <div className="emailContainer">
      <span className="labels">UserName:</span>
      <input
        className="inputs"
        placeholder="username"
        value={login.username}
        onChange={(e) => 
          setLogin({ ...login, username: e.target.value })
        }
      />
    </div>
    <div className="passwordContainer">
      <span className="labels">Password:</span>
      <input
        className="inputs"
        placeholder="password"
        value={login.email}
        onChange={(e) => 
          setLogin({ ...login, password: e.target.value })
        }
      />
    </div>
    <div className="loginBtnContainer">
      <span className="loginBtn" onClick={handleLogin}>Login</span>
    </div>
  </div>
  )
}

export default Login