import React, { useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

function OptionsBtn({option,index,add,remove}) {  

  const handleSelect = (id) => {
    var element = document.getElementById(`${id}`);
    var container = document.getElementById(`container${id}`);


    if (element?.classList.contains("selected")) {
      element?.classList.remove("selected");
      container?.classList.remove("selectedBackground");
      remove(id)
    } else {
      element?.classList.add("selected");
      container?.classList.add("selectedBackground");
      add(id)
    }
  };

  return (
    <div className="optionBtnContainer">
      <span
        id={`container${index}`}
        className="filterBtn"
        onClick={()=>handleSelect(index)}>
        {option} <FaPlus id={index} className="icons" />
      </span>
    </div>
  );
}

export default OptionsBtn;
