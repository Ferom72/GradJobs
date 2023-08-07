import React, { useContext, useState } from "react";
import "../MyStyles/JobContainer.css";
import { useNavigate,Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt,FaRegStar } from "react-icons/fa";

function JobContainer({jobs,select}) {
  const StarContainer = [];
  const navigate = useNavigate()

  function StarAmount() {

    for(let i = 0; i < jobs?.rating; i++) {
      StarContainer.push(<FaStar key={i} className="stars"/>);
    }

    if(jobs?.half){
      StarContainer.push(<FaStarHalfAlt key={StarContainer.length} className="stars"/>);
    }

    for(let i = StarContainer.length; i < 5;i++){
      StarContainer.push(<FaRegStar key={i} className="stars"/>);
    }

  }

  StarAmount()

  return (
    <div key={jobs.id} className="outerContainer">
      <div className="jobContainer">
        <div className="jobContainerFlow">
          <div className="titleContainer">
            <span className="title">{jobs?.jobTitle}</span>
          </div>
          <div className="jobInfoContainer">
            <span className="jobInfo">
              {jobs?.jobDiscription}
            </span>
          </div>
        </div>
        <div className="jobContainerFlow">
          <div className="titleContainer">
            <span className="title">{jobs?.companyName}</span>
          </div>
          <div className="outerContainer ratingStars">
            <div className="ratingContainer">
              <div className="innerContainers">
                <span className="rating">Rating:</span>
              </div>
              <div className="innerContainers">
                {StarContainer}
              </div>
            </div>
          </div>
          <div className="jobInfoContainer">
            <span className="jobInfo">
              {jobs?.companyDiscription}
            </span>
          </div>
          <Link to="/jobInfo" className="links" onClick={()=> select(jobs?.id)}>
            <div className="moreInfoBtnContainer">    
              <span className="moreInfoBtn">More Info</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default JobContainer;
