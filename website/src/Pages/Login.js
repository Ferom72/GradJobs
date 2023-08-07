import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import "../MyStyles/LoginRegister.css";
import { UserContext } from "../Context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { handleLoginNavStatus, setUser } = useContext(UserContext);
  const [display, setDisplay] = useState(false);
  const [displayError,setDisplayError] = useState(false)
  const [errorMessage,setErrorMessage] = useState()

  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const { username, password } = login;

    try {
      const { data } = await axios.post("/login", { username, password });

      if (data.error) {
        setErrorMessage(data.error)
        setDisplayError(true)
      } else {
        setLogin({});
        setUser(login);
        handleLoginNavStatus(true);
        navigate("/");
      }
    } catch (e) {
      console.log(e.error);
    }
  };

  function handleDisplay() {
    setDisplay(!display);
  }

  const HandleShowPass = () => {
    var status = document.getElementById("password");

    if (status) {
      if (display === true) {
        status.type = "string";
      } else {
        status.type = "password";
      }
    }

    if (display === true) {
      return <FaEye className="eyeIcon" onClick={handleDisplay} />;
    } else {
      return <FaEyeSlash className="eyeIcon" onClick={handleDisplay} />;
    }
  };

  
  const ErrorMessage = () =>{
    return (
     <div className="errorMessageContainer">
       <span className="errorMessage">{errorMessage}</span>
     </div>
    )
 }

  return (
    <div className="loginRegisterOut">
      {displayError ? <ErrorMessage/> : <span></span>}
      <div className="emailContainer">
        <span className="labels">UserName:</span>
        <div className="inputContainer">
          <input
            className="inputs"
            placeholder="username"
            value={login.username}
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
          />
        </div>
      </div>
      <div className="passwordContainer">
        <span className="labels">Password:</span>
        <div className="inputContainer">
          <input
            id="password"
            type="password"
            className="inputs"
            placeholder="password"
            value={login.email}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <HandleShowPass />
        </div>
      </div>
      <div className="loginBtnContainer">
        <span className="loginBtn" onClick={handleLogin}>
          Login
        </span>
      </div>
    </div>
  );
}

export default Login;
