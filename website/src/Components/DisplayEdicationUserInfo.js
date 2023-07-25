import React from 'react'

function DisplayEdicationUserInfo({educationDatas}) {
  return (
    <div className="educationGrid">
    <div className="educationContainers">
      <div>
        <span>School Name:</span>
      </div>
      <input
        className="educationInputs"
        disabled
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
        disabled
        defaultValue={educationDatas?.startDate}
      />
    </div>
    <div className="educationContainers">
      <div>
        <span>End Date:</span>
      </div>
      <input
        className="educationInputs"
        disabled
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
        disabled
        defaultValue={educationDatas?.highestEdu}
      />
    </div>
    <div className="educationContainers">
      <div>
        <span>Name of Degree:</span>
      </div>
      <input
        className="educationInputs"
        disabled
        defaultValue={educationDatas?.degree}
      />
    </div>
  </div>
  )
}

export default DisplayEdicationUserInfo