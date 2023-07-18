import React from "react";

function FormSetup({handleClick}) {

  return (
    <div className="loginRegisterContainer">
      <div class="custom-checkbox" >
        <input id="status" type="checkbox" name="status" />
        <label>
          <div
            class="status-switch"
            data-unchecked="Login"
            data-checked="Register"></div>
        </label>
      </div>
    </div>
  );
}

export default FormSetup;
