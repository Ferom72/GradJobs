import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Nav from "../Components/Nav";
import data from "../Helper/Helper.json";
import Img from "../Images/dataAnalyze.jpeg"
import "../MyStyles/JobInfo.css";
import Requisits from "../Components/Requisits";

function JobInfo() {
  const { job } = useContext(UserContext);
  const jobSelected = data?.jobs.find((jobs) => jobs?.id === Number(job));
  const StarContainer = [];

  function StarAmount() {
    for (let i = 0; i < jobSelected?.rating; i++) {
      StarContainer.push(<FaStar key={i} className="jobInfoPageStars" />);
    }

    if (jobSelected?.half) {
      StarContainer.push(
        <FaStarHalfAlt
          key={StarContainer.length}
          className="jobInfoPageStars"
        />
      );
    }

    for (let i = StarContainer.length; i < 5; i++) {
      StarContainer.push(<FaRegStar key={i} className="jobInfoPageStars" />);
    }
  }

  StarAmount();

  return (
    <div>
      <Nav/>
      <div className="hero">
        <div className="bannerContainer">
          <img className="bannerImg" src={Img} alt="bannerPic" />
        </div>
      </div>
      <div className="outerContainer">
        <div className="jobInfoPageOuterContainer">
          <div className="jobInfoPageContainer">
            <div className="jobInfoPageTitleContainer">
              <span className="jobInfoTitle">{jobSelected?.jobTitle}</span>
            </div>
            <div className="jobInfoPageDiscriptionContainer">
              <span className="jobInfoPageDiscription">
                {jobSelected?.jobDiscription}
              </span>
            </div>
          </div>
          <div className="jobInfoPageRequisitsContainer">
            <div className="requisitsTitleContainer">
              <span className="requisits">Requisits</span>
            </div>
            <div className="requisitsListContainer">
              <div className="requisitsContainer">
                <Requisits requisits={jobSelected?.reqs} id={jobSelected?.id} />
              </div>
            </div>
          </div>
          <div className="companyInfoPageContainer">
            <div className="aboutCompContainer">
              <span className="aboutComp">About the Company</span>
            </div>
            <div className="jobInfoPageRatingContainer">
              <div className="jobInfoPageinnerContainers">
                <span className="jobInfoPageRating">Rating:</span>
              </div>
              <div className="jobInfoPageInnerContainers">{StarContainer}</div>
            </div>
            <div className="jobInfoPageCompanyDiscription">
              <span className="companyDiscription">
                {jobSelected?.jobInfoPageAboutTheCompany}
              </span>
            </div>
            <div className="applyBtnContainer">
              <span className="applyBtn">Apply</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default JobInfo;
