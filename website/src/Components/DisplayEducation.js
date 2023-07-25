import React, { useContext } from 'react'
import { FaMinus } from "react-icons/fa";

function DisplayEducation({id,educationDatas,handleRemoveEducation}) {

  return (
    <div className="educationGrid">
      <div className="educationContainers">
        <div>
          <span>School Name:</span>
        </div>
        <input
          className="educationInputs"
         defaultValue={educationDatas?.schoolName}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Start Date:</span>
        </div>
        <input
          className="educationInputs"
          type="date"
         defaultValue={educationDatas?.startDate}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>End Date:</span>
        </div>
        <input
          className="educationInputs"
          type="date"
         defaultValue={educationDatas?.endDate}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Highest Degree:</span>
        </div>
        <input
          className="educationInputs"
         defaultValue={educationDatas?.highestEdu}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Name of Degree:</span>
        </div>
        <input
          className="educationInputs"
         defaultValue={educationDatas?.degree}
        />
      </div>
      <div className="addEducationBtnContainer">
        <span className="addMoreEdText">Remove Education</span>
        <FaMinus className="addEducationBtn" onClick={()=>handleRemoveEducation(id)}/>
      </div>
    </div>
  )
}

export default DisplayEducation