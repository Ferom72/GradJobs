import React, { useCallback, useEffect, useState } from "react";
import "../MyStyles/JobsFilter.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import OptionsBtn from "./OptionsBtn";
import SelectedBtn from "./SelectedBtn";

function JobsFilter() {
  const [dropDownClick, setDropDownClick] = useState(false);
  const [ints, setInts] = useState([]);
  const [selected, setSelected] = useState([]);
  const selectedContainer = []

  const options = [
    "Remote",
    "Internship",
    "Aprentiship",
    "90k-100k",
    "70k-80k",
    "60k-70k",
    "10 miles",
    "15miles",
    "20miles",
  ];

  let add = (id) => {
    ints.push(id);
  };

  let remove = (id) => {
    const index = ints.indexOf(id);
    ints.splice(index, 1);
  };

  function SelectedDropDownContainer(){
    for (let i = 0; i < ints.length; i++) {
      if (!selected.includes(options[ints[i]])) {
        selected.push(options[ints[i]]);
      }
    }
    
    for (let i = 0; i < selected.length; i++) {
      selectedContainer.push(
        <SelectedBtn key={i} info={selected[i]}/>
      )
    }    
  };

  const DropDownContainer = () => {
    return options.map((option, index) => (
      <OptionsBtn
        key={index}
        option={option}
        index={index}
        add={add}
        remove={remove}
      />
    ));
  };

  const handleDropDown = () => {
    setDropDownClick(!dropDownClick);
    if (dropDownClick === true) {
      if (
        !document.querySelector(".gridContainer").classList.contains("disapear")
      ) {
        document.querySelector(".gridContainer").classList.add("disapear");
        document
          .querySelector(".selectedContainer")
          .classList.remove("disapear");
        setSelected([]);
      }
    } else if (dropDownClick === false) {
      if (
        document.querySelector(".gridContainer").classList.contains("disapear")
      ) {
        document.querySelector(".gridContainer").classList.remove("disapear");
        document.querySelector(".selectedContainer").classList.add("disapear");
        setInts([]);
      }
    }
  };

  SelectedDropDownContainer()

  return (
    <div className="filterBtnContainer">
      <div>
        <span className="filterBtn" onClick={handleDropDown}>
          Filter Jobs{" "}
          {!dropDownClick ? (
            <FaPlus className="icons" />
          ) : (
            <FaMinus className="icons" />
          )}
        </span>
      </div>
      <div className="gridContainer disapear">
        <div className="gridFilter">
          <DropDownContainer />
        </div>
      </div>
      <div className="selectedContainer">
        <div className="gridFilter">
          {selectedContainer}
        </div>
      </div>
    </div>
  );
}

export default JobsFilter;
