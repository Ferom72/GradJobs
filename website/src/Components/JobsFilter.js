import React, { useCallback, useContext, useEffect, useState } from "react";
import "../MyStyles/JobsFilter.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import OptionsBtn from "./OptionsBtn";
import SelectedBtn from "./SelectedBtn";
import { UserContext } from "../Context/UserContext";

function JobsFilter() {
  const{handleFilter,jobfilters,setJobFilters} = useContext(UserContext)
  const [dropDownClick, setDropDownClick] = useState(false);
  const [ints, setInts] = useState([]);
  const [selected, setSelected] = useState([]);
  const selectedContainer = []

  const options = [
    {
      keys:1,
      type: "distance",
      value: "Remote"
    },
    {
      keys:2,
      type: "type",
      value: "Internship"
    },
    {
      keys:3,
      type: "type",
      value: "Aprentiship"
    },
    {
      keys:4,
      type: "pay",
      value: "90k-100k"
    },
    {
      keys:5,
      type: "pay",
      value: "70k-80k"
    },
    {
      keys:6,
      type: "pay",
      value: "60k-70k"
    },
    {
      keys:7,
      type: "distance",
      value: "10 miles" 
    },
    {
      keys:8,
      type: "distance",
      value: "15 miles"
    },
    {
      keys:9,
      type: "distance",
      value: "20 miles"
    },
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
      if (!selected.includes(options[ints[i]].value)) {
        handleFilter(options[ints[i]])
        selected.push(options[ints[i]].value);
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
        option={option.value}
        index={index}
        add={add}
        remove={remove}
      />
    ));
  };

  const handleDropDown = () => {
    setDropDownClick(!dropDownClick);
    setJobFilters([])
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
