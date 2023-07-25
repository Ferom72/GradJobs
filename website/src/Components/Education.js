import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { FaPlus, FaMinus } from "react-icons/fa";

function Education() {
  const { educationData, handleEducationData } = useContext(UserContext);

  return (
    <div className="educationGrid">
      <div className="educationContainers">
        <div>
          <span>School Name:</span>
        </div>
        <input
          className="educationInputs"
          required
          name="schoolName"
          value={educationData?.schoolName}
          onChange={(e) => handleEducationData("schoolName",e.target.value)}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Start Date:</span>
        </div>
        <input
          className="educationInputs"
          required
          name="startDate"
          type="date"
          value={educationData?.startDate}
          onChange={(e) => handleEducationData("startDate",e.target.value)}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>End Date:</span>
        </div>
        <input
          className="educationInputs"
          required
          name="endDate"
          type="date"
          value={educationData?.endDate}
          onChange={(e) => handleEducationData("endDate",e.target.value)}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Highest Degree:</span>
        </div>
        <input
          className="educationInputs"
          required
          name="highestEdu"
          value={educationData?.highestEdu}
          onChange={(e) => handleEducationData("highestEdu",e.target.value)}
        />
      </div>
      <div className="educationContainers">
        <div>
          <span>Name of Degree:</span>
        </div>
        <input
          className="educationInputs"
          required
          name="degree"
          value={educationData?.degree}
          onChange={(e) => handleEducationData("degree",e.target.value)}
        />
      </div>
    </div>
  );
}

export default Education;
