import React,{useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import '../MyStyles/LoginRegister.css'
import { UserContext } from '../Context/UserContext';
import {FaEyeSlash,FaEye } from "react-icons/fa6";

function Register() {

  const navigate = useNavigate()
  const {setUser,setUserStatus,handleLoginNavStatus} = useContext(UserContext)
  const [passwordDisplay,setPasswordDisplay] = useState(false)
  const [confpasswordDisplay,setConfPasswordDisplay] = useState(false)

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
          setUser(register)
          handleLoginNavStatus(true)
          navigate('/setup')
         }

  
      }catch(e){
        console.log(e)
      }
    }else{
      console.log("password dont match")
    }
  }

  function handlePasswordDisplay(){
    setPasswordDisplay(!passwordDisplay)
  }

  function handleConfPasswordDisplay(){
    setConfPasswordDisplay(!confpasswordDisplay)
  }

  const HandleShowPass = () =>{

      var status = document.getElementById('password')

      if(status){
        if(passwordDisplay === true){
          status.type = ""
        }else{
          status.type = "password"
        }
      }

      
    
      if(passwordDisplay === true){
        return (<FaEye className='eyeIcon' onClick={handlePasswordDisplay}/>)
      }else{  
        return (<FaEyeSlash className='eyeIcon' onClick={handlePasswordDisplay}/>)
      }
  }

  const HandleConfShowConfPass = () =>{

    var status = document.getElementById('confpassword')

    if(status){
      if(confpasswordDisplay === true){
        status.type = ""
      }else{
        status.type = "password"
      }
    }
   
  
    if(confpasswordDisplay === true){
      return (<FaEye className='eyeIcon' onClick={handleConfPasswordDisplay}/>)
    }else{  
      return (<FaEyeSlash className='eyeIcon' onClick={handleConfPasswordDisplay}/>)
    }
  }


  return (
    <div>
          <div className="emailContainer">
            <span className="labels">Name:</span>
            <div className='inputContainer'>
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
          </div>
          <div className="emailContainer">
            <span className="labels">Email:</span>
            <div className='inputContainer'>
              <input
                className="inputs"
                placeholder="email"
                value={register.email}
                onChange={(e) => 
                  setRegister({ ...register, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="emailContainer">
            <span className="labels">UserName:</span>
            <div className='inputContainer'>
              <input
                className="inputs"
                placeholder="username"
                value={register.username}
                onChange={(e) => 
                  setRegister({ ...register, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="passwordContainer">
            <span className="labels">Password:</span>
            <div className='inputContainer'>
              <input
                id='password'
                className="inputs"
                type='password'
                placeholder="password"
                value={register.password}
                onChange={(e) => 
                  setRegister({ ...register, password: e.target.value })
                }
              />
              <HandleShowPass/>
            </div>
          </div>
          <div className="emailContainer">
            <span className="labels">ConfirmPassword:</span>
            <div className='inputContainer'>
              <input
                id='confpassword'
                className="inputs"
                type='password'
                placeholder="confirm password"
                value={register.confirmpassword}
                onChange={(e) => 
                  setRegister({ ...register, confirmpassword: e.target.value })
                }
              />
              <HandleConfShowConfPass/>
            </div>
           
          </div>
          <div className="loginBtnContainer">
            <span className="loginBtn" onClick={handleRegister}>Register</span>
          </div>
        </div>
  )
}

export default Register