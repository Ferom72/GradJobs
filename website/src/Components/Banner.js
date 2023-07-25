import React, { useContext, useState } from "react";
import "../MyStyles/Banner.css";
import Img from "../Images/group-interview.jpg";
import { FaSearch } from "react-icons/fa";
import { UserContext } from "../Context/UserContext";

function Banner() {
  const { handleSearch } = useContext(UserContext);
  const [localSearch, setlocalSearch] = useState("");

  return (
    <div className="hero">
      <div className="bannerContainer">
        <div className="bannerImgWrapper">
          <img className="bannerImgHome" src={Img} alt="bannerPic" />
        </div>
        <div className="searchBarForm">
          <div className="searchBarContainer">
            <input
              className="searchBar"
              type="string"
              placeholder="Search..."
              value={localSearch}
              onChange={(e) => setlocalSearch(e.target.value)}
            />
            <FaSearch
              className="searchBtn"
              onClick={() => handleSearch(localSearch)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
