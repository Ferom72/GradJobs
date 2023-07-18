import React from 'react'

function SelectedBtn({info}) {
  return (
    <div className="optionBtnContainer">
      <span
        className="filterBtn">
        {info}
      </span>
    </div>
  )
}

export default SelectedBtn