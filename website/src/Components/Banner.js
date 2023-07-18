import React, { useState } from "react";
import "../MyStyles/Banner.css";
import Img from "../Images/group-interview.jpg";
import {FaSearch} from "react-icons/fa";

function Banner() {
  const [search, setSearch] = useState("");

  const handleSubmit = () => {};

  return (
    <div className="hero">
      <div className="bannerContainer">
        <img className="bannerImg" src={Img} alt="bannerPic" />
      </div>
      <div className="searchBarForm">
        <div className="searchBarContainer">
            <input
                className="searchBar"
                type="string"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="searchBtn" onClick={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default Banner;
