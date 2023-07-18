import React,{useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../MyStyles/LoginRegister.css'
import { UserContext } from '../Context/UserContext';

function Register() {

  const navigate = useNavigate()
  const {setUser,setUserStatus} = useContext(UserContext)

  const [register, setRegister] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handleRegister = async(e) =>{

    e.preventDefault()

    if(register.confirmpassword === register.password){
      const {name,email,username,password} = register

      try{
         const {data} = await axios.post('/register',{
          name,
          email,
          username,
          password,
          job: []
         })
         
         if(data.error){
          return (<p>{data.error}</p>)
         }else{
          setRegister({})
          setUserStatus(true)
          navigate('/setup')
         }
      }catch(e){
        console.log(e)
      }
    }else{
      console.log("password dont match")
    }
  }

  return (
    <div>
          <div className="emailContainer">
            <span className="labels">Name:</span>
            <input
              className="inputs"
              type="username"
              placeholder="name"
              value={register.name}
              onChange={(e) =>{
                setRegister({ ...register, name: e.target.value })
              }}
            />
          </div>
          <div className="emailContainer">
            <span className="labels">Email:</span>
            <input
              className="inputs"
              placeholder="email"
              value={register.email}
              onChange={(e) => 
                setRegister({ ...register, email: e.target.value })
              }
            />
          </div>
          <div className="emailContainer">
            <span className="labels">UserName:</span>
            <input
              className="inputs"
              placeholder="username"
              value={register.username}
              onChange={(e) => 
                setRegister({ ...register, username: e.target.value })
              }
            />
          </div>
          <div className="passwordContainer">
            <span className="labels">Password:</span>
            <input
              className="inputs"
              type='password'
              placeholder="password"
              value={register.password}
              onChange={(e) => 
                setRegister({ ...register, password: e.target.value })
              }
            />
          </div>
          <div className="emailContainer">
            <span className="labels">ConfirmPassword:</span>
            <input
              className="inputs"
              type='password'
              placeholder="confirm password"
              value={register.confirmpassword}
              onChange={(e) => 
                setRegister({ ...register, confirmpassword: e.target.value })
              }
            />
          </div>
          <div className="loginBtnContainer">
            <span className="loginBtn" onClick={handleRegister}>Register</span>
          </div>
        </div>
  )
}

export default Register