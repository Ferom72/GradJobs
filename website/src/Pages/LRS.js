import React, { useState, useEffect } from "react";
import "../MyStyles/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import Login from './Login';
import Register from "./Register";
import LRNav from "../Components/LRNav";

function LRS() {

  const [click, setClick] = useState(false);
  const [clickStatus, setClickStatus] = useState(false);

  const LoginRegister = () => {
    if (click) {
      return (
       <Login/>
      );
    } else {
      return (
        <Register/>
      );
    }
  };

  useEffect(() => {
    setClick(!click);
  }, [clickStatus]);

  const handleClick = () => {
    setClickStatus(!clickStatus);
  };

  return (
    <div>
      <LRNav/>
      <div className="loginOuterContainer">
        <div
          id="loginRegister"
          className="loginRegisterContainer"
          onClick={() => handleClick()}>
          <div className="custom-checkbox">
            <input id="status" type="checkbox" name="status" />
            <label for="status">
              <div
                className="status-switch"
                data-unchecked="Login"
                data-checked="Register"></div>
            </label>
          </div>
        </div>
        <LoginRegister/>
      </div>
    </div>
  );
}

export default LRS;
